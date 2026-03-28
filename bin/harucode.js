#!/usr/bin/env node

import { program } from 'commander';
import { VERSION, DESCRIPTION } from '../src/config.js';

program
  .name('harucode')
  .description(DESCRIPTION)
  .version(VERSION, '-v, --version');

program.parse();
