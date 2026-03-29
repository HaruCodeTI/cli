import { describe, it, expect } from 'vitest';
import { skillCatalog, getSkillsForRole, getSkillById, getSkillCategories } from '../src/skills/catalog.js';

describe('skill catalog', () => {
  it('should have 13 skills total', () => {
    expect(skillCatalog.length).toBe(13);
  });

  it('should have 5 produtividade skills', () => {
    const skills = getSkillsForRole('socio', 'produtividade');
    expect(skills.length).toBe(5);
  });

  it('should have 4 comercial skills', () => {
    const skills = getSkillsForRole('socio', 'comercial');
    expect(skills.length).toBe(4);
  });

  it('should have 4 conteudo skills', () => {
    const skills = getSkillsForRole('socio', 'conteudo');
    expect(skills.length).toBe(4);
  });

  it('should return all 13 skills for socio', () => {
    const skills = getSkillsForRole('socio');
    expect(skills.length).toBe(13);
  });

  it('should exclude comercial for funcionario', () => {
    const skills = getSkillsForRole('funcionario');
    expect(skills.length).toBe(9);
    expect(skills.some(s => s.category === 'comercial')).toBe(false);
  });

  it('should find skill by id', () => {
    const skill = getSkillById('brain-dump-parser');
    expect(skill).toBeDefined();
    expect(skill.category).toBe('produtividade');
    expect(skill.version).toBe('1.0.0');
  });

  it('should return undefined for unknown id', () => {
    expect(getSkillById('nonexistent')).toBeUndefined();
  });

  it('should return 3 categories', () => {
    const cats = getSkillCategories();
    expect(cats).toEqual(['produtividade', 'comercial', 'conteudo']);
  });
});
