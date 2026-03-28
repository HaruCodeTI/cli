// src/ui/banner.js
import figlet from 'figlet';
import chalk from 'chalk';
import { VERSION, TAGLINE } from '../config.js';

export function printBanner() {
  const art = figlet.textSync('HARUCODE', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
  });

  console.log(chalk.hex('#a78bfa')(art));
  console.log(chalk.gray(`  ${TAGLINE} · v${VERSION}`));
  console.log();
}
