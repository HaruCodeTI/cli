// src/commands/skills.js
import * as p from '@clack/prompts';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createStore } from '../store/store.js';
import { getSkillsForRole, getSkillById, getSkillCategories, getSkillSourcePath } from '../skills/catalog.js';
import { getSkillStatus, installSkill } from '../skills/installer.js';
import { ui } from '../ui/format.js';
import { HARUCODE_DIR } from '../config.js';

const GLOBAL_SKILLS_DIR = join(homedir(), '.claude', 'skills');

function stateLabel(state) {
  switch (state) {
    case 'current': return ui.green('✓ instalada');
    case 'outdated': return ui.yellow('⬆ atualização');
    case 'modified': return ui.purple('✎ modificada');
    default: return '';
  }
}

async function getTargetDir(options) {
  if (options.global) return GLOBAL_SKILLS_DIR;
  if (options.local) return join(process.cwd(), '.claude', 'skills');

  const scope = await p.select({
    message: 'Instalar em:',
    options: [
      { value: 'global', label: `Global (${GLOBAL_SKILLS_DIR})` },
      { value: 'local', label: 'Projeto atual (.claude/skills/)' },
    ],
  });

  if (p.isCancel(scope)) {
    p.cancel('Operação cancelada.');
    process.exit(0);
  }

  return scope === 'global' ? GLOBAL_SKILLS_DIR : join(process.cwd(), '.claude', 'skills');
}

async function enrichSkillsWithStatus(skills, targetDir) {
  const enriched = [];
  for (const skill of skills) {
    const status = await getSkillStatus(skill.id, skill.version, targetDir);
    enriched.push({ ...skill, ...status });
  }
  return enriched;
}

function printSkillList(skills) {
  const categories = getSkillCategories();
  const grouped = {};
  for (const skill of skills) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  }

  const totalInstalled = skills.filter(s => s.state === 'current').length;
  const totalOutdated = skills.filter(s => s.state === 'outdated').length;

  console.log(ui.bullet('Skills HaruCode') + ui.gray(` (${skills.length} disponíveis · ${totalInstalled} instaladas · ${totalOutdated} com atualização)`));
  console.log();

  for (const cat of categories) {
    if (!grouped[cat]) continue;
    const isRestricted = grouped[cat].every(s => !s.access.includes('funcionario'));
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    const tag = isRestricted ? ' ' + ui.tag('sócio') : '';
    console.log(ui.gray(`  ${label}`) + tag + ui.gray(` (${grouped[cat].length} skills)`));

    for (const skill of grouped[cat]) {
      const id = ui.purple(`    ${skill.id.padEnd(24)}`);
      const desc = ui.dim(`─  ${skill.description}`);
      const state = skill.state !== 'not_installed' ? ' ' + stateLabel(skill.state) : '';
      console.log(`${id}${desc}${state}`);
    }
    console.log();
  }
}

async function installSkills(skills, targetDir) {
  let installed = 0;
  let updated = 0;
  let skipped = 0;

  for (const skill of skills) {
    const sourcePath = getSkillSourcePath(skill);

    if (skill.state === 'current') {
      console.log(ui.success(`${skill.id}`) + ui.gray(' — já instalada, versão atual'));
      skipped++;
    } else if (skill.state === 'modified') {
      console.log(ui.purple(`✎ ${skill.id}`) + ui.gray(' — modificada localmente, pulando'));
      skipped++;
    } else if (skill.state === 'outdated') {
      await installSkill(sourcePath, skill.id, targetDir);
      console.log(ui.yellow(`⬆ ${skill.id}`) + ui.gray(` — atualizada (${skill.localVersion} → ${skill.version})`));
      updated++;
    } else {
      await installSkill(sourcePath, skill.id, targetDir);
      console.log(ui.green(`+ ${skill.id}`) + ui.gray(' — instalada'));
      installed++;
    }
  }

  console.log(ui.line());
  const parts = [];
  if (installed > 0) parts.push(`${installed} nova${installed !== 1 ? 's' : ''}`);
  if (updated > 0) parts.push(`${updated} atualizada${updated !== 1 ? 's' : ''}`);
  if (skipped > 0) parts.push(`${skipped} sem mudanças`);
  console.log(ui.success('Pronto! ' + parts.join(' · ')));
}

export async function skillsCommand(options) {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();
  const allSkills = getSkillsForRole(auth.role);

  // --list: just print and exit
  if (options.list) {
    const targetDir = GLOBAL_SKILLS_DIR;
    const enriched = await enrichSkillsWithStatus(allSkills, targetDir);
    printSkillList(enriched);
    return;
  }

  // --status: show only installed
  if (options.status) {
    const enriched = await enrichSkillsWithStatus(allSkills, GLOBAL_SKILLS_DIR);
    const installed = enriched.filter(s => s.state !== 'not_installed');
    if (installed.length === 0) {
      console.log(ui.warn('Nenhuma skill instalada. Execute ') + ui.purple('harucode skills') + ui.gray(' para instalar.'));
      return;
    }
    printSkillList(installed);
    return;
  }

  // Interactive mode
  const targetDir = await getTargetDir(options);
  const enriched = await enrichSkillsWithStatus(allSkills, targetDir);
  printSkillList(enriched);

  console.log(ui.separator());

  const outdatedCount = enriched.filter(s => s.state === 'outdated').length;
  const menuOptions = [
    { value: 'category', label: 'Instalar todas de uma categoria' },
    { value: 'individual', label: 'Escolher skills individuais' },
  ];
  if (outdatedCount > 0) {
    menuOptions.push({ value: 'update', label: `Atualizar skills com update disponível (${outdatedCount})` });
  }
  menuOptions.push({ value: 'exit', label: 'Sair' });

  const action = await p.select({
    message: 'O que deseja fazer?',
    options: menuOptions,
  });

  if (p.isCancel(action) || action === 'exit') {
    p.cancel('Até mais!');
    return;
  }

  if (action === 'category') {
    const categories = getSkillCategories().filter(c => {
      return enriched.some(s => s.category === c);
    });
    const cat = await p.select({
      message: 'Qual categoria?',
      options: categories.map(c => ({
        value: c,
        label: `${c.charAt(0).toUpperCase() + c.slice(1)} (${enriched.filter(s => s.category === c).length} skills)`,
      })),
    });
    if (p.isCancel(cat)) return;
    const skills = enriched.filter(s => s.category === cat);
    await installSkills(skills, targetDir);
  }

  if (action === 'individual') {
    const notInstalled = enriched.filter(s => s.state !== 'current');
    if (notInstalled.length === 0) {
      console.log(ui.success('Todas as skills já estão instaladas e atualizadas!'));
      return;
    }
    const selected = await p.multiselect({
      message: 'Selecione as skills:',
      options: notInstalled.map(s => ({
        value: s.id,
        label: `${s.id} — ${s.description}`,
      })),
    });
    if (p.isCancel(selected)) return;
    const skills = enriched.filter(s => selected.includes(s.id));
    await installSkills(skills, targetDir);
  }

  if (action === 'update') {
    const outdated = enriched.filter(s => s.state === 'outdated');
    await installSkills(outdated, targetDir);
  }
}

export async function skillsInstallCommand(skillId, options) {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();
  const targetDir = options.global === false
    ? join(process.cwd(), '.claude', 'skills')
    : GLOBAL_SKILLS_DIR;

  // Install by category
  if (options.cat) {
    const skills = getSkillsForRole(auth.role, options.cat);
    if (skills.length === 0) {
      console.log(ui.error(`Categoria "${options.cat}" não encontrada.`));
      process.exit(1);
    }
    const enriched = await enrichSkillsWithStatus(skills, targetDir);
    await installSkills(enriched, targetDir);
    return;
  }

  // Install single skill
  const skill = getSkillById(skillId);
  if (!skill) {
    console.log(ui.error(`Skill "${skillId}" não encontrada. Use `) + ui.purple('harucode skills --list') + ui.gray(' para ver disponíveis.'));
    process.exit(1);
  }

  if (!skill.access.includes(auth.role)) {
    console.log(ui.error('Sem permissão para instalar esta skill.'));
    process.exit(1);
  }

  const enriched = await enrichSkillsWithStatus([skill], targetDir);
  await installSkills(enriched, targetDir);
}

export async function skillsUpdateCommand() {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();
  const allSkills = getSkillsForRole(auth.role);
  const enriched = await enrichSkillsWithStatus(allSkills, GLOBAL_SKILLS_DIR);
  const outdated = enriched.filter(s => s.state === 'outdated');

  if (outdated.length === 0) {
    console.log(ui.success('Todas as skills estão atualizadas!'));
    return;
  }

  await installSkills(outdated, GLOBAL_SKILLS_DIR);
}
