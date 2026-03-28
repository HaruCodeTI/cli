export const registry = [
  // === Structural — Brand ===
  { id: 'brand-foundation', path: 'brand-foundation.md', type: 'structural', category: 'brand', access: ['socio', 'funcionario'], description: 'Posicionamento, valores, roadmap' },
  { id: 'voice-and-style', path: 'voice-and-style.md', type: 'structural', category: 'brand', access: ['socio', 'funcionario'], description: 'Tom por canal, copy principles' },
  { id: 'visual-system', path: 'visual-system.md', type: 'structural', category: 'brand', access: ['socio', 'funcionario'], description: 'Identidade visual, cores, tipografia' },

  // === Structural — Operacional ===
  { id: 'templates-whatsapp', path: 'templates-whatsapp.md', type: 'structural', category: 'operacional', access: ['socio', 'funcionario'], description: 'Templates de mensagem por situação' },
  { id: 'working-rules', path: 'working-rules.md', type: 'structural', category: 'operacional', access: ['socio', 'funcionario'], description: 'Regras de autonomia e operação' },
  { id: 'whatsapp-ops', path: 'whatsapp-cowork-ops.md', type: 'structural', category: 'operacional', access: ['socio', 'funcionario'], description: 'Ops de WhatsApp (grupos + envio)' },

  // === Structural — Pessoal (sócio only) ===
  { id: 'about-me', path: 'about-me.md', type: 'structural', category: 'pessoal', access: ['socio'], description: 'Perfil do Ian' },
  { id: 'speech-patterns', path: 'speech-patterns.md', type: 'structural', category: 'pessoal', access: ['socio'], description: 'Padrões linguísticos' },
  { id: 'perfil-psicologico', path: 'perfil-psicologico.md', type: 'structural', category: 'pessoal', access: ['socio'], description: 'Referência psicológica' },

  // === Structural — Estratégia (sócio only) ===
  { id: 'estrategia-vendas', path: 'estrategia-vendas.md', type: 'structural', category: 'estrategia', access: ['socio'], description: 'Metodologia, funil, scripts, objeções' },
  { id: 'inteligencia-ghl', path: 'inteligencia-mercado-ghl.md', type: 'structural', category: 'estrategia', access: ['socio'], description: 'Precificação e argumentação GHL' },
  { id: 'pesquisa-nichos', path: 'pesquisa-nichos.md', type: 'structural', category: 'estrategia', access: ['socio'], description: 'ICP, nichos validados, filtros' },

  // === Volatile — Status ===
  { id: 'empresa-status', path: 'empresa-status.md', type: 'volatile', category: 'status', access: ['socio', 'funcionario'], description: 'Status da empresa (time, projetos, financeiro)' },

  // === Volatile — Comercial (sócio only) ===
  { id: 'clientes', path: 'Clientes', type: 'volatile', category: 'comercial', access: ['socio'], description: 'Documentação de clientes ativos', isDir: true },
  { id: 'prospeccao', path: 'Prospeccao', type: 'volatile', category: 'comercial', access: ['socio'], description: 'Pipeline de prospecção', isDir: true },
  { id: 'follow-up', path: 'Follow-Up', type: 'volatile', category: 'comercial', access: ['socio'], description: 'Tracking de follow-ups', isDir: true },

  // === Volatile — Inteligência (sócio only) ===
  { id: 'relatorios', path: 'Relatorios', type: 'volatile', category: 'inteligencia', access: ['socio'], description: 'Relatórios de inteligência', isDir: true },

  // === Volatile — Jurídico (sócio only) ===
  { id: 'contratos', path: 'Contratos', type: 'volatile', category: 'juridico', access: ['socio'], description: 'Contratos ativos', isDir: true },

  // === Volatile — Marketing ===
  { id: 'conteudo', path: 'Conteudo', type: 'volatile', category: 'marketing', access: ['socio', 'funcionario'], description: 'Conteúdo de marketing', isDir: true },
];

export function getDocsForRole(role, category = null) {
  let docs = registry.filter(d => d.access.includes(role));
  if (category) {
    docs = docs.filter(d => d.category === category);
  }
  return docs;
}

export function getDocById(id) {
  return registry.find(d => d.id === id);
}

export function getCategories() {
  const cats = [];
  for (const doc of registry) {
    if (!cats.includes(doc.category)) {
      cats.push(doc.category);
    }
  }
  return cats;
}
