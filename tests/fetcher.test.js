// tests/fetcher.test.js
import { describe, it, expect, vi } from 'vitest';
import { buildRawUrl, parseGitHubError } from '../src/github/fetcher.js';

describe('fetcher', () => {
  it('should build correct raw URL for a file', () => {
    const url = buildRawUrl('empresa-status.md');
    expect(url).toBe(
      'https://raw.githubusercontent.com/HaruCode/context/main/empresa-status.md'
    );
  });

  it('should build correct raw URL for a nested path', () => {
    const url = buildRawUrl('Clientes/BR-Consult.md');
    expect(url).toBe(
      'https://raw.githubusercontent.com/HaruCode/context/main/Clientes/BR-Consult.md'
    );
  });

  it('should parse 401 as token error', () => {
    const msg = parseGitHubError(401);
    expect(msg).toContain('token');
  });

  it('should parse 404 as not found', () => {
    const msg = parseGitHubError(404);
    expect(msg).toContain('encontrado');
  });

  it('should parse 403 as rate limit or permission', () => {
    const msg = parseGitHubError(403);
    expect(msg).toContain('permissão');
  });
});
