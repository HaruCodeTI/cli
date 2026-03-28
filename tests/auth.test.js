// tests/auth.test.js
import { describe, it, expect } from 'vitest';
import bcrypt from 'bcryptjs';
import { verifySocioPassword, hashPassword } from '../src/auth/auth.js';

describe('auth', () => {
  const testPassword = 'harucode2026';
  const testHash = bcrypt.hashSync(testPassword, 10);

  it('should verify correct socio password', async () => {
    const result = await verifySocioPassword(testPassword, testHash);
    expect(result).toBe(true);
  });

  it('should reject wrong password', async () => {
    const result = await verifySocioPassword('wrong-password', testHash);
    expect(result).toBe(false);
  });

  it('should hash a password', async () => {
    const hash = await hashPassword(testPassword);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(testPassword);
    const match = await verifySocioPassword(testPassword, hash);
    expect(match).toBe(true);
  });
});
