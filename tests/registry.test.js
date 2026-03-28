import { describe, it, expect } from 'vitest';
import { getDocsForRole, getDocById, getCategories, registry } from '../src/docs/registry.js';

describe('registry', () => {
  it('should have all 12 structural docs', () => {
    const structural = registry.filter(d => d.type === 'structural');
    expect(structural.length).toBe(12);
  });

  it('should return all docs for socio', () => {
    const docs = getDocsForRole('socio');
    expect(docs.length).toBe(registry.length);
  });

  it('should return only permitted docs for funcionario', () => {
    const docs = getDocsForRole('funcionario');
    const allDocs = registry.length;
    expect(docs.length).toBeLessThan(allDocs);
    expect(docs.every(d => d.access.includes('funcionario'))).toBe(true);
  });

  it('should not include pessoal category for funcionario', () => {
    const docs = getDocsForRole('funcionario');
    expect(docs.some(d => d.category === 'pessoal')).toBe(false);
  });

  it('should not include estrategia category for funcionario', () => {
    const docs = getDocsForRole('funcionario');
    expect(docs.some(d => d.category === 'estrategia')).toBe(false);
  });

  it('should find doc by id', () => {
    const doc = getDocById('brand-foundation');
    expect(doc).toBeDefined();
    expect(doc.path).toBe('brand-foundation.md');
    expect(doc.category).toBe('brand');
  });

  it('should return undefined for unknown id', () => {
    expect(getDocById('nonexistent')).toBeUndefined();
  });

  it('should return unique categories', () => {
    const cats = getCategories();
    const unique = [...new Set(cats)];
    expect(cats).toEqual(unique);
  });

  it('should filter docs by category', () => {
    const docs = getDocsForRole('socio', 'brand');
    expect(docs.every(d => d.category === 'brand')).toBe(true);
    expect(docs.length).toBe(3);
  });
});
