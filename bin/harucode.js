#!/usr/bin/env node

import { program } from 'commander';
import { VERSION, DESCRIPTION } from '../src/config.js';
import { initCommand } from '../src/commands/init.js';
import { contextCommand } from '../src/commands/context.js';
import { syncCommand } from '../src/commands/sync.js';
import { statusCommand } from '../src/commands/status.js';
import { whoamiCommand } from '../src/commands/whoami.js';
import { skillsCommand, skillsInstallCommand, skillsUpdateCommand } from '../src/commands/skills.js';
import { printBanner } from '../src/ui/banner.js';

program
  .name('harucode')
  .description(DESCRIPTION)
  .version(VERSION, '-v, --version');

program
  .command('init')
  .description('Setup inicial — configura seu perfil e baixa os docs')
  .action(initCommand);

program
  .command('context [doc]')
  .description('Ver docs de contexto da empresa')
  .option('--copy', 'Copiar conteúdo pro clipboard')
  .option('--path', 'Mostrar caminho local do arquivo')
  .option('--raw', 'Output sem formatação (markdown puro)')
  .option('--cat <category>', 'Filtrar por categoria')
  .action(contextCommand);

program
  .command('sync')
  .description('Atualiza docs voláteis do GitHub')
  .action(syncCommand);

program
  .command('status')
  .description('Status da empresa (time, projetos, financeiro)')
  .action(statusCommand);

program
  .command('whoami')
  .description('Mostra seu perfil e configuração')
  .action(whoamiCommand);

const skillsProgram = program
  .command('skills')
  .description('Gerenciar skills do Claude Code da HaruCode')
  .option('--list', 'Listar skills sem menu interativo')
  .option('--status', 'Mostrar só as skills instaladas')
  .action(skillsCommand);

skillsProgram
  .command('install [skill]')
  .description('Instalar skill específica ou por categoria')
  .option('--cat <category>', 'Instalar todas de uma categoria')
  .action(skillsInstallCommand);

skillsProgram
  .command('update')
  .description('Atualizar skills com versão nova disponível')
  .action(skillsUpdateCommand);

// Show banner on --help
program.on('--help', () => {
  console.log();
  printBanner();
});

// Default: show help if no command
if (process.argv.length <= 2) {
  printBanner();
  program.help();
}

program.parse();
