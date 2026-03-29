import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getSkillStatus, installSkill, parseSkillFrontmatter } from '../src/skills/installer.js';

describe('installer', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'harucode-skills-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('parseSkillFrontmatter', () => {
    it('should extract version from frontmatter', () => {
      const content = '---\nname: test\nversion: 1.2.3\n---\nBody';
      const fm = parseSkillFrontmatter(content);
      expect(fm.version).toBe('1.2.3');
    });

    it('should return null version if no frontmatter', () => {
      const fm = parseSkillFrontmatter('No frontmatter here');
      expect(fm.version).toBeNull();
    });

    it('should return null version if version field missing', () => {
      const content = '---\nname: test\n---\nBody';
      const fm = parseSkillFrontmatter(content);
      expect(fm.version).toBeNull();
    });
  });

  describe('getSkillStatus', () => {
    it('should return "not_installed" when skill does not exist', async () => {
      const status = await getSkillStatus('test-skill', '1.0.0', tempDir);
      expect(status.state).toBe('not_installed');
    });

    it('should return "current" when versions match', async () => {
      const skillDir = join(tempDir, 'test-skill');
      await mkdir(skillDir, { recursive: true });
      await writeFile(join(skillDir, 'SKILL.md'), '---\nname: test-skill\nversion: 1.0.0\n---\nContent');
      const status = await getSkillStatus('test-skill', '1.0.0', tempDir);
      expect(status.state).toBe('current');
    });

    it('should return "outdated" when local version is older', async () => {
      const skillDir = join(tempDir, 'test-skill');
      await mkdir(skillDir, { recursive: true });
      await writeFile(join(skillDir, 'SKILL.md'), '---\nname: test-skill\nversion: 0.9.0\n---\nContent');
      const status = await getSkillStatus('test-skill', '1.0.0', tempDir);
      expect(status.state).toBe('outdated');
      expect(status.localVersion).toBe('0.9.0');
    });

    it('should return "modified" when local version is newer', async () => {
      const skillDir = join(tempDir, 'test-skill');
      await mkdir(skillDir, { recursive: true });
      await writeFile(join(skillDir, 'SKILL.md'), '---\nname: test-skill\nversion: 2.0.0\n---\nContent');
      const status = await getSkillStatus('test-skill', '1.0.0', tempDir);
      expect(status.state).toBe('modified');
    });
  });

  describe('installSkill', () => {
    it('should copy skill to target directory', async () => {
      const sourceDir = join(tempDir, 'source');
      const targetDir = join(tempDir, 'target');
      await mkdir(join(sourceDir, 'test-skill'), { recursive: true });
      await writeFile(join(sourceDir, 'test-skill', 'SKILL.md'), '---\nname: test\nversion: 1.0.0\n---\nBody');

      const result = await installSkill(
        join(sourceDir, 'test-skill', 'SKILL.md'),
        'test-skill',
        targetDir
      );

      expect(result).toBe(true);
      const installed = await readFile(join(targetDir, 'test-skill', 'SKILL.md'), 'utf-8');
      expect(installed).toContain('version: 1.0.0');
    });
  });
});
