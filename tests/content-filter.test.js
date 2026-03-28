import { describe, it, expect } from 'vitest';
import { filterContent } from '../src/docs/content-filter.js';

const sampleDoc = `# Empresa Status

## Time
3 sócios, 2 funcionários

## Projetos Ativos
- BR-Consult
- TopVans

<!-- socio-only -->
## Financeiro
MRR: R$ 12.500

## Pipeline
3 prospects em prospecção
<!-- /socio-only -->

## Contato
contato@harucode.com.br`;

describe('filterContent', () => {
  it('should return full content for socio', () => {
    const result = filterContent(sampleDoc, 'socio');
    expect(result).toContain('Financeiro');
    expect(result).toContain('MRR: R$ 12.500');
    expect(result).toContain('Pipeline');
    expect(result).toContain('Time');
    expect(result).not.toContain('<!-- socio-only -->');
    expect(result).not.toContain('<!-- /socio-only -->');
  });

  it('should strip socio-only sections for funcionario', () => {
    const result = filterContent(sampleDoc, 'funcionario');
    expect(result).toContain('Time');
    expect(result).toContain('Projetos Ativos');
    expect(result).toContain('Contato');
    expect(result).not.toContain('Financeiro');
    expect(result).not.toContain('MRR');
    expect(result).not.toContain('Pipeline');
  });

  it('should handle content without markers', () => {
    const plain = '# Simple doc\n\nNo restricted content.';
    expect(filterContent(plain, 'funcionario')).toBe(plain);
    expect(filterContent(plain, 'socio')).toBe(plain);
  });

  it('should handle multiple socio-only blocks', () => {
    const multi = `Public 1\n<!-- socio-only -->\nSecret 1\n<!-- /socio-only -->\nPublic 2\n<!-- socio-only -->\nSecret 2\n<!-- /socio-only -->\nPublic 3`;
    const result = filterContent(multi, 'funcionario');
    expect(result).toContain('Public 1');
    expect(result).toContain('Public 2');
    expect(result).toContain('Public 3');
    expect(result).not.toContain('Secret 1');
    expect(result).not.toContain('Secret 2');
  });
});
