// src/commands/init.js
import * as p from '@clack/prompts';
import { printBanner } from '../ui/banner.js';
import { ui } from '../ui/format.js';
import { createStore } from '../store/store.js';
import { verifySocioPassword } from '../auth/auth.js';
import { getDocsForRole } from '../docs/registry.js';
import {
  HARUCODE_DIR, SOCIO_PASSWORD_HASH, VERSION,
  ROLES, PACKAGE_STRUCTURAL_DIR,
} from '../config.js';
import { copyFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function initCommand() {
  const store = createStore(HARUCODE_DIR);

  printBanner();

  // Check re-init
  if (await store.isInitialized()) {
    const shouldReset = await p.confirm({
      message: 'Já existe um setup. Deseja resetar?',
    });

    if (p.isCancel(shouldReset)) {
      p.cancel('Operação cancelada.');
      process.exit(0);
    }

    if (!shouldReset) {
      p.log.info('Use ' + ui.purple('harucode sync') + ' para atualizar docs.');
      return;
    }

    await store.reset();
  }

  // Name
  const name = await p.text({
    message: 'Qual é o seu nome?',
    placeholder: 'Seu nome',
    validate: (v) => v.length === 0 ? 'Nome é obrigatório' : undefined,
  });

  if (p.isCancel(name)) {
    p.cancel('Operação cancelada.');
    process.exit(0);
  }

  // Role
  const role = await p.select({
    message: 'Qual é o seu perfil?',
    options: [
      { value: ROLES.SOCIO, label: 'Sócio' },
      { value: ROLES.FUNCIONARIO, label: 'Funcionário' },
    ],
  });

  if (p.isCancel(role)) {
    p.cancel('Operação cancelada.');
    process.exit(0);
  }

  // Password (socio only)
  if (role === ROLES.SOCIO) {
    const password = await p.password({
      message: 'Senha de acesso (sócio):',
    });

    if (p.isCancel(password)) {
      p.cancel('Operação cancelada.');
      process.exit(0);
    }

    const valid = await verifySocioPassword(password, SOCIO_PASSWORD_HASH);
    if (!valid) {
      p.log.error('Senha incorreta.');
      process.exit(1);
    }

    p.log.success('Autenticado como sócio');
  }

  // Setup
  const s = p.spinner();

  await store.init();

  // Copy structural docs
  s.start('Copiando docs estruturais');
  const docs = getDocsForRole(role).filter(d => d.type === 'structural');
  try {
    const files = await readdir(PACKAGE_STRUCTURAL_DIR);
    const allowedPaths = docs.map(d => d.path);
    for (const file of files) {
      if (allowedPaths.includes(file)) {
        await copyFile(
          join(PACKAGE_STRUCTURAL_DIR, file),
          join(store.structuralDir, file)
        );
      }
    }
    s.stop(`Docs estruturais copiados (${docs.length} arquivos)`);
  } catch {
    s.stop('Docs estruturais copiados');
  }

  // Save auth
  await store.saveAuth({ name, role });

  // Save config
  await store.saveConfig({
    version: VERSION,
    lastSync: null,
    repoUrl: 'HaruCode/context',
  });

  // Summary
  console.log();
  console.log(ui.success('Setup completo!'));
  console.log();
  console.log(ui.gray('  Comandos disponíveis:'));
  console.log(ui.gray('  ') + ui.purple('harucode context') + ui.gray(' — ver docs de contexto'));
  console.log(ui.gray('  ') + ui.purple('harucode sync') + ui.gray('    — atualizar docs voláteis'));
  console.log(ui.gray('  ') + ui.purple('harucode status') + ui.gray('  — status da empresa'));
  console.log(ui.gray('  ') + ui.purple('harucode whoami') + ui.gray('  — seu perfil'));
  console.log();
  console.log(ui.gray('  Execute ') + ui.purple('harucode sync') + ui.gray(' para baixar os docs voláteis do GitHub.'));
}
