// src/ui/format.js
import chalk from 'chalk';

const purple = chalk.hex('#a78bfa');
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;
const gray = chalk.gray;
const dim = chalk.dim;

export const ui = {
  purple,
  green,
  yellow,
  red,
  gray,
  dim,

  bullet(text) {
    return `${purple('◇')} ${text}`;
  },

  success(text) {
    return `${green('✓')} ${green(text)}`;
  },

  warn(text) {
    return `${yellow('⚠')} ${text}`;
  },

  error(text) {
    return `${red('✗')} ${red(text)}`;
  },

  line() {
    return dim('│');
  },

  separator() {
    return dim('  ─────────────────────────────────────────');
  },

  tag(label) {
    return yellow(label);
  },

  tip(lines) {
    const border = dim('│  ');
    const top = dim('│  ┌─ Tip ──────────────────────────────────────────────┐');
    const bottom = dim('│  └────────────────────────────────────────────────────┘');
    const body = lines.map(l => `${border}${dim('│')} ${l}`).join('\n');
    return `${top}\n${body}\n${bottom}`;
  },
};
