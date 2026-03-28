#!/usr/bin/env node

import { program } from 'commander';
import { VERSION, DESCRIPTION } from '../src/config.js';
import { initCommand } from '../src/commands/init.js';
import { syncCommand } from '../src/commands/sync.js';
import { contextCommand } from '../src/commands/context.js';
import { statusCommand } from '../src/commands/status.js';
import { whoamiCommand } from '../src/commands/whoami.js';

program
  .name('harucode')
  .description(DESCRIPTION)
  .version(VERSION, '-v, --version');

program
  .command('init')
  .description('Setup inicial — configura seu perfil e baixa os docs')
  .action(initCommand);

program
  .command('sync')
  .description('Atualiza docs voláteis do GitHub')
  .action(syncCommand);

program
  .command('context [doc]')
  .description('Ver docs de contexto da empresa')
  .option('--copy', 'Copiar conteúdo pro clipboard')
  .option('--path', 'Mostrar caminho local do arquivo')
  .option('--raw', 'Output sem formatação (markdown puro)')
  .option('--cat <category>', 'Filtrar por categoria')
  .action(contextCommand);

program
  .command('status')
  .description('Status da empresa (time, projetos, financeiro)')
  .action(statusCommand);

program
  .command('whoami')
  .description('Mostra seu perfil e configuração')
  .action(whoamiCommand);

program.parse();
