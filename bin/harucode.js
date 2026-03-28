#!/usr/bin/env node

import { program } from 'commander';
import { VERSION, DESCRIPTION } from '../src/config.js';
import { initCommand } from '../src/commands/init.js';
import { syncCommand } from '../src/commands/sync.js';

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

program.parse();
