import { mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { join } from 'node:path';

export function createStore(baseDir) {
  const authFile = join(baseDir, 'auth.json');
  const configFile = join(baseDir, 'config.json');
  const structuralDir = join(baseDir, 'docs', 'structural');
  const volatileDir = join(baseDir, 'docs', 'volatile');
  const cacheDir = join(baseDir, 'cache');

  async function init() {
    await mkdir(structuralDir, { recursive: true });
    await mkdir(volatileDir, { recursive: true });
    await mkdir(cacheDir, { recursive: true });
  }

  async function fileExists(path) {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }

  async function readJson(path) {
    if (!(await fileExists(path))) return null;
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async function writeJson(path, data) {
    await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  }

  async function saveAuth(auth) {
    await writeJson(authFile, auth);
  }

  async function readAuth() {
    return readJson(authFile);
  }

  async function saveConfig(config) {
    await writeJson(configFile, config);
  }

  async function readConfig() {
    return readJson(configFile);
  }

  async function isInitialized() {
    return fileExists(authFile);
  }

  async function reset() {
    await rm(baseDir, { recursive: true, force: true });
  }

  return {
    baseDir,
    structuralDir,
    volatileDir,
    cacheDir,
    init,
    saveAuth,
    readAuth,
    saveConfig,
    readConfig,
    isInitialized,
    reset,
  };
}
