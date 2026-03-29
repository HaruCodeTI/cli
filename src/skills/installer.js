import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';

export function parseSkillFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { version: null };

  const frontmatter = match[1];
  const versionMatch = frontmatter.match(/^version:\s*(.+)$/m);
  return {
    version: versionMatch ? versionMatch[1].trim() : null,
  };
}

function compareVersions(a, b) {
  if (!a || !b) return 0;
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const va = pa[i] || 0;
    const vb = pb[i] || 0;
    if (va > vb) return 1;
    if (va < vb) return -1;
  }
  return 0;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function getSkillStatus(skillId, packageVersion, targetDir) {
  const skillFile = join(targetDir, skillId, 'SKILL.md');

  if (!(await fileExists(skillFile))) {
    return { state: 'not_installed', localVersion: null };
  }

  const content = await readFile(skillFile, 'utf-8');
  const { version: localVersion } = parseSkillFrontmatter(content);

  if (!localVersion) {
    return { state: 'outdated', localVersion: null };
  }

  const cmp = compareVersions(localVersion, packageVersion);
  if (cmp === 0) return { state: 'current', localVersion };
  if (cmp < 0) return { state: 'outdated', localVersion };
  return { state: 'modified', localVersion };
}

export async function installSkill(sourcePath, skillId, targetDir) {
  const targetSkillDir = join(targetDir, skillId);
  await mkdir(targetSkillDir, { recursive: true });

  const content = await readFile(sourcePath, 'utf-8');
  await writeFile(join(targetSkillDir, 'SKILL.md'), content, 'utf-8');
  return true;
}
