import * as p from '@clack/prompts';
import { createStore } from '../store/store.js';
import { getDocsForRole } from '../docs/registry.js';
import { fetchFile, fetchDir } from '../github/fetcher.js';
import { ui } from '../ui/format.js';
import { HARUCODE_DIR } from '../config.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

function md5(content) {
  return createHash('md5').update(content).digest('hex');
}

async function readLocalFile(path) {
  try {
    const { readFile } = await import('node:fs/promises');
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

export async function syncCommand() {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ' + ui.purple('harucode init') + ' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();

  // Check GitHub token
  if (!auth.githubToken) {
    console.log(ui.warn('Token do GitHub não encontrado.'));
    console.log(ui.line());
    console.log(ui.gray('  Para acessar os docs privados, você precisa de um'));
    console.log(ui.gray('  Personal Access Token (classic) com permissão "repo".'));
    console.log();
    console.log(ui.tip([
      '1. Acesse: github.com/settings/tokens',
      '2. Generate new token (classic)',
      '3. Marque apenas o scope "repo"',
      '4. Copie e cole aqui',
      '',
      'Guia completo:',
      'docs.github.com/en/authentication/',
      '  keeping-your-account-and-data-secure/',
      '  managing-your-personal-access-tokens',
    ]));
    console.log(ui.line());

    const token = await p.password({
      message: 'Cole seu GitHub Token:',
    });

    if (p.isCancel(token)) {
      p.cancel('Operação cancelada.');
      process.exit(0);
    }

    auth.githubToken = token;
    await store.saveAuth(auth);
    console.log(ui.success('Token salvo'));
    console.log();
  }

  // Fetch volatile docs
  const volatileDocs = getDocsForRole(auth.role).filter(d => d.type === 'volatile');
  let updated = 0;
  let unchanged = 0;
  let errors = 0;

  const s = p.spinner();
  s.start('Sincronizando docs voláteis');
  s.stop('Sincronizando docs voláteis...');

  for (const doc of volatileDocs) {
    try {
      if (doc.isDir) {
        const files = await fetchDir(doc.path, auth.githubToken);
        const localDir = join(store.volatileDir, doc.path);
        await mkdir(localDir, { recursive: true });

        for (const file of files) {
          const localPath = join(store.volatileDir, file.path);
          const localContent = await readLocalFile(localPath);

          if (localContent && md5(localContent) === md5(file.content)) {
            unchanged++;
          } else {
            await writeFile(localPath, file.content, 'utf-8');
            updated++;
            console.log(ui.bullet(`${file.path}`) + ui.green(' ✓ atualizado'));
          }
        }
      } else {
        const content = await fetchFile(doc.path, auth.githubToken);
        const localPath = join(store.volatileDir, doc.path);
        await mkdir(dirname(localPath), { recursive: true });
        const localContent = await readLocalFile(localPath);

        if (localContent && md5(localContent) === md5(content)) {
          unchanged++;
          console.log(ui.bullet(`${doc.path}`) + ui.gray(' — sem mudanças'));
        } else {
          await writeFile(localPath, content, 'utf-8');
          updated++;
          console.log(ui.bullet(`${doc.path}`) + ui.green(' ✓ atualizado'));
        }
      }
    } catch (err) {
      errors++;
      console.log(ui.error(`${doc.path} — ${err.message}`));
    }
  }

  // Update config
  const config = (await store.readConfig()) || {};
  config.lastSync = new Date().toISOString();
  await store.saveConfig(config);

  console.log(ui.line());
  console.log(ui.success(
    `Sync completo · ${updated} atualizado${updated !== 1 ? 's' : ''} · ${unchanged} sem mudanças` +
    (errors > 0 ? ` · ${errors} erro${errors !== 1 ? 's' : ''}` : '')
  ));
  console.log(ui.gray(`  Último sync: agora`));
}
