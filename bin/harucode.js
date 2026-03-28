#!/usr/bin/env node

import { program } from 'commander';
import { VERSION, DESCRIPTION } from '../src/config.js';
import { initCommand } from '../src/commands/init.js';

program
  .name('harucode')
  .description(DESCRIPTION)
  .version(VERSION, '-v, --version');

program
  .command('init')
  .description('Setup inicial — configura seu perfil e baixa os docs')
  .action(initCommand);

program.parse();
