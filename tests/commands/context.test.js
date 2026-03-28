// tests/commands/context.test.js
import { describe, it, expect } from 'vitest';
import { getDocsForRole, getDocById } from '../../src/docs/registry.js';
import { filterContent } from '../../src/docs/content-filter.js';

describe('context command logic', () => {
  it('should list brand docs for funcionario', () => {
    const docs = getDocsForRole('funcionario', 'brand');
    expect(docs.length).toBe(3);
    expect(docs.map(d => d.id)).toContain('brand-foundation');
  });

  it('should not allow funcionario to access estrategia docs', () => {
    const doc = getDocById('estrategia-vendas');
    expect(doc.access).not.toContain('funcionario');
  });

  it('should filter empresa-status for funcionario', () => {
    const content = `# Status\n## Time\n3 sócios\n<!-- socio-only -->\n## MRR\nR$ 12.500\n<!-- /socio-only -->\n## Fim`;
    const filtered = filterContent(content, 'funcionario');
    expect(filtered).toContain('Time');
    expect(filtered).not.toContain('MRR');
    expect(filtered).toContain('Fim');
  });

  it('should show full empresa-status for socio', () => {
    const content = `# Status\n## Time\n3 sócios\n<!-- socio-only -->\n## MRR\nR$ 12.500\n<!-- /socio-only -->\n## Fim`;
    const filtered = filterContent(content, 'socio');
    expect(filtered).toContain('Time');
    expect(filtered).toContain('MRR');
    expect(filtered).toContain('Fim');
  });
});
