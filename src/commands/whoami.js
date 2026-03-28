// src/commands/whoami.js
import { createStore } from '../store/store.js';
import { ui } from '../ui/format.js';
import { HARUCODE_DIR } from '../config.js';

export async function whoamiCommand() {
  const store = createStore(HARUCODE_DIR);

  if (!(await store.isInitialized())) {
    console.log(ui.warn('Você ainda não fez o setup. Execute ') + ui.purple('harucode init') + ui.gray(' primeiro.'));
    process.exit(1);
  }

  const auth = await store.readAuth();
  const config = await store.readConfig();

  const lastSync = config?.lastSync
    ? new Date(config.lastSync).toLocaleString('pt-BR')
    : 'nunca';

  const roleLabel = auth.role === 'socio' ? 'Sócio' : 'Funcionário';
  const hasToken = auth.githubToken ? ui.green('configurado') : ui.yellow('não configurado');

  console.log(ui.bullet(ui.purple.bold(auth.name)) + ui.gray(` · ${roleLabel}`));
  console.log(ui.line());
  console.log(ui.gray(`  Perfil:       `) + roleLabel);
  console.log(ui.gray(`  Versão:       `) + (config?.version || 'desconhecida'));
  console.log(ui.gray(`  Último sync:  `) + lastSync);
  console.log(ui.gray(`  GitHub token: `) + hasToken);
  console.log(ui.gray(`  Diretório:    `) + HARUCODE_DIR);
}
