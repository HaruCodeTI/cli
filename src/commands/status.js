// src/commands/status.js
import { createStore } from '../store/store.js';
import { filterContent } from '../docs/content-filter.js';
import { ui } from '../ui/format.js';
import { HARUCODE_DIR } from '../config.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

const marked = new Marked(markedTerminal());

export async function statusCommand() {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();
  const config = await store.readConfig();

  const statusPath = join(store.volatileDir, 'empresa-status.md');

  let content;
  try {
    content = await readFile(statusPath, 'utf-8');
  } catch {
    console.log(ui.warn('Arquivo de status não encontrado. Execute ') + ui.purple('harucode sync') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  content = filterContent(content, auth.role);

  const lastSync = config?.lastSync
    ? new Date(config.lastSync).toLocaleDateString('pt-BR')
    : 'nunca';

  console.log(ui.bullet(ui.purple.bold('HaruCode · Status')) + ui.gray(` · atualizado em ${lastSync}`));
  console.log();
  console.log(marked.parse(content));
  console.log(ui.separator());
  console.log(ui.gray('  Fonte: empresa-status.md · ') + ui.purple('harucode sync') + ui.gray(' para atualizar'));
}
