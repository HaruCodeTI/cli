import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const VERSION = '1.0.0';
export const DESCRIPTION = 'CLI de contexto da HaruCode — docs, sync e status da empresa';
export const TAGLINE = 'Soluções tecnológicas';

export const HARUCODE_DIR = join(homedir(), '.harucode');
export const AUTH_FILE = join(HARUCODE_DIR, 'auth.json');
export const CONFIG_FILE = join(HARUCODE_DIR, 'config.json');
export const DOCS_DIR = join(HARUCODE_DIR, 'docs');
export const STRUCTURAL_DIR = join(DOCS_DIR, 'structural');
export const VOLATILE_DIR = join(DOCS_DIR, 'volatile');
export const CACHE_DIR = join(HARUCODE_DIR, 'cache');

export const PACKAGE_STRUCTURAL_DIR = join(__dirname, 'docs', 'structural');

export const GITHUB_REPO = 'HaruCode/context';
export const GITHUB_BRANCH = 'main';
export const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Hash bcrypt da senha de sócio — gerar com: npx bcryptjs hash <senha>
export const SOCIO_PASSWORD_HASH = '$2a$10$PLACEHOLDER_HASH_REPLACE_BEFORE_PUBLISH';

export const ROLES = {
  SOCIO: 'socio',
  FUNCIONARIO: 'funcionario',
};

export const CATEGORIES = ['brand', 'operacional', 'pessoal', 'estrategia', 'status', 'comercial', 'inteligencia', 'juridico', 'marketing'];

export const BRAND_COLOR = '#a78bfa';
