import { createStore } from '../store/store.js';
import { getDocsForRole, getDocById, getCategories } from '../docs/registry.js';
import { filterContent } from '../docs/content-filter.js';
import { ui } from '../ui/format.js';
import { HARUCODE_DIR } from '../config.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import clipboard from 'clipboardy';

const marked = new Marked(markedTerminal());

function resolveDocPath(store, doc) {
  if (doc.type === 'structural') {
    return join(store.structuralDir, doc.path);
  }
  return join(store.volatileDir, doc.path);
}

async function listDocs(role, category) {
  const docs = getDocsForRole(role, category);
  const categories = getCategories();

  const grouped = {};
  for (const doc of docs) {
    if (!grouped[doc.category]) grouped[doc.category] = [];
    grouped[doc.category].push(doc);
  }

  console.log(ui.bullet(`Docs disponíveis`) + ui.gray(` (perfil: ${role})`));
  console.log();

  for (const cat of categories) {
    if (!grouped[cat]) continue;
    const isRestricted = grouped[cat].every(d => !d.access.includes('funcionario'));
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    const tag = isRestricted ? ' ' + ui.tag('sócio') : '';
    console.log(ui.gray(`  ${label}`) + tag);

    for (const doc of grouped[cat]) {
      const id = ui.purple(`    ${doc.id.padEnd(22)}`);
      console.log(`${id}${ui.dim(`─  ${doc.description}`)}`);
    }
    console.log();
  }

  console.log(ui.separator());
  console.log(ui.gray('  Use ') + ui.purple('harucode context <id>') + ui.gray(' para ver um doc'));
  console.log(ui.gray('  Use ') + ui.purple('harucode context <id> --copy') + ui.gray(' para copiar pro clipboard'));
  console.log(ui.gray('  Use ') + ui.purple('harucode context <id> --path') + ui.gray(' para ver caminho do arquivo'));
}

async function showDoc(store, docId, options) {
  const doc = getDocById(docId);
  const auth = await store.readAuth();

  if (!doc) {
    console.log(ui.error(`Doc "${docId}" não encontrado. Use `) + ui.purple('harucode context') + ui.gray(' para listar.'));
    process.exit(1);
  }

  if (!doc.access.includes(auth.role)) {
    console.log(ui.error('Sem permissão para acessar este doc.'));
    process.exit(1);
  }

  if (doc.isDir) {
    console.log(ui.error(`"${docId}" é uma pasta. Use `) + ui.purple('harucode sync') + ui.gray(' e acesse via ') + ui.purple('--path') + ui.gray('.'));
    process.exit(1);
  }

  const filePath = resolveDocPath(store, doc);

  if (options.path) {
    console.log(filePath);
    return;
  }

  let content;
  try {
    content = await readFile(filePath, 'utf-8');
  } catch {
    console.log(ui.warn(`Arquivo não encontrado localmente. Execute `) + ui.purple('harucode sync') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  content = filterContent(content, auth.role);

  if (options.copy) {
    await clipboard.write(content);
    console.log(ui.success(`Conteúdo de "${docId}" copiado pro clipboard.`));
    return;
  }

  const typeLabel = doc.type === 'structural' ? 'structural' : 'volatile';
  console.log(ui.bullet(ui.purple.bold(doc.id)) + ui.gray(` · ${doc.category} · ${typeLabel}`));

  if (options.raw) {
    console.log(content);
  } else {
    console.log(marked.parse(content));
  }

  console.log(ui.separator());
  console.log(
    ui.gray('  ') + ui.purple('--copy') + ui.gray(' para clipboard  ·  ') +
    ui.purple('--path') + ui.gray(' para caminho do arquivo  ·  ') +
    ui.purple('--raw') + ui.gray(' sem formatação')
  );
}

export async function contextCommand(docId, options) {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();

  if (!docId) {
    await listDocs(auth.role, options.cat || null);
  } else {
    await showDoc(store, docId, options);
  }
}
