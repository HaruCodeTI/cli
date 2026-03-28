import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createStore } from '../src/store/store.js';

describe('store', () => {
  let tempDir;
  let store;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'harucode-test-'));
    store = createStore(tempDir);
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('should initialize directory structure', async () => {
    await store.init();
    const { existsSync } = await import('node:fs');
    expect(existsSync(join(tempDir, 'docs', 'structural'))).toBe(true);
    expect(existsSync(join(tempDir, 'docs', 'volatile'))).toBe(true);
    expect(existsSync(join(tempDir, 'cache'))).toBe(true);
  });

  it('should save and read auth', async () => {
    await store.init();
    const auth = { name: 'Ian', role: 'socio' };
    await store.saveAuth(auth);
    const read = await store.readAuth();
    expect(read).toEqual(auth);
  });

  it('should return null when auth does not exist', async () => {
    await store.init();
    const read = await store.readAuth();
    expect(read).toBeNull();
  });

  it('should save and read config', async () => {
    await store.init();
    const config = { version: '1.0.0', lastSync: '2026-03-28' };
    await store.saveConfig(config);
    const read = await store.readConfig();
    expect(read).toEqual(config);
  });

  it('should check if initialized', async () => {
    expect(await store.isInitialized()).toBe(false);
    await store.init();
    await store.saveAuth({ name: 'Ian', role: 'socio' });
    expect(await store.isInitialized()).toBe(true);
  });

  it('should reset by removing and re-initializing', async () => {
    await store.init();
    await store.saveAuth({ name: 'Ian', role: 'socio' });
    await store.reset();
    expect(await store.isInitialized()).toBe(false);
  });
});
