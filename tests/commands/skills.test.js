// tests/commands/skills.test.js
import { describe, it, expect } from 'vitest';
import { getSkillsForRole, getSkillById, getSkillCategories } from '../../src/skills/catalog.js';
import { parseSkillFrontmatter } from '../../src/skills/installer.js';

describe('skills command logic', () => {
  it('should list 9 skills for funcionario (no comercial)', () => {
    const skills = getSkillsForRole('funcionario');
    expect(skills.length).toBe(9);
    expect(skills.some(s => s.category === 'comercial')).toBe(false);
  });

  it('should list 13 skills for socio', () => {
    const skills = getSkillsForRole('socio');
    expect(skills.length).toBe(13);
  });

  it('should have 3 categories in correct order', () => {
    expect(getSkillCategories()).toEqual(['produtividade', 'comercial', 'conteudo']);
  });

  it('should not allow funcionario to access proposta-comercial', () => {
    const skill = getSkillById('proposta-comercial');
    expect(skill.access).not.toContain('funcionario');
  });

  it('should parse version from real skill frontmatter', () => {
    const content = '---\nname: brain-dump-parser\nversion: 1.0.0\ncategory: produtividade\ndescription: >\n  Test\naccess:\n  - socio\n  - funcionario\n---\n# Content';
    const fm = parseSkillFrontmatter(content);
    expect(fm.version).toBe('1.0.0');
  });
});
