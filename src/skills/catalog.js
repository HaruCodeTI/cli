import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SKILLS_BASE_DIR = __dirname;

export const skillCatalog = [
  // === Produtividade (todos) ===
  { id: 'brain-dump-parser', version: '1.0.0', category: 'produtividade', access: ['socio', 'funcionario'], description: 'Processa transcrições de áudio em info estruturada', dir: 'produtividade/brain-dump-parser' },
  { id: 'briefing-matinal', version: '1.0.0', category: 'produtividade', access: ['socio', 'funcionario'], description: 'Briefing diário matinal', dir: 'produtividade/briefing-matinal' },
  { id: 'status-semanal', version: '1.0.0', category: 'produtividade', access: ['socio', 'funcionario'], description: 'Relatório semanal de projetos e pipeline', dir: 'produtividade/status-semanal' },
  { id: 'review-semanal', version: '1.0.0', category: 'produtividade', access: ['socio', 'funcionario'], description: 'Review de produtividade (sexta-feira)', dir: 'produtividade/review-semanal' },
  { id: 'pos-reuniao', version: '1.0.0', category: 'produtividade', access: ['socio', 'funcionario'], description: 'Captura notas e ações pós-reunião', dir: 'produtividade/pos-reuniao' },

  // === Comercial (sócio only) ===
  { id: 'pesquisa-prospect', version: '1.0.0', category: 'comercial', access: ['socio'], description: 'Pesquisar empresa e decisor pra abordagem', dir: 'comercial/pesquisa-prospect' },
  { id: 'prep-reuniao', version: '1.0.0', category: 'comercial', access: ['socio'], description: 'Briefing pré-reunião', dir: 'comercial/prep-reuniao' },
  { id: 'proposta-comercial', version: '1.0.0', category: 'comercial', access: ['socio'], description: 'Criar propostas comerciais', dir: 'comercial/proposta-comercial' },
  { id: 'follow-up-comercial', version: '1.0.0', category: 'comercial', access: ['socio'], description: 'Gerenciar follow-ups com prospects', dir: 'comercial/follow-up-comercial' },

  // === Conteúdo (todos) ===
  { id: 'conteudo-instagram', version: '1.0.0', category: 'conteudo', access: ['socio', 'funcionario'], description: 'Gerar Reels, carrosséis, bastidores', dir: 'conteudo/conteudo-instagram' },
  { id: 'conteudo-linkedin', version: '1.0.0', category: 'conteudo', access: ['socio', 'funcionario'], description: 'Posts LinkedIn para fundadores', dir: 'conteudo/conteudo-linkedin' },
  { id: 'conteudo-blog', version: '1.0.0', category: 'conteudo', access: ['socio', 'funcionario'], description: 'Artigos SEO para harucode.com.br', dir: 'conteudo/conteudo-blog' },
  { id: 'calendario-editorial', version: '1.0.0', category: 'conteudo', access: ['socio', 'funcionario'], description: 'Planejamento mensal de conteúdo', dir: 'conteudo/calendario-editorial' },
];

export function getSkillsForRole(role, category = null) {
  let skills = skillCatalog.filter(s => s.access.includes(role));
  if (category) {
    skills = skills.filter(s => s.category === category);
  }
  return skills;
}

export function getSkillById(id) {
  return skillCatalog.find(s => s.id === id);
}

export function getSkillCategories() {
  const cats = [];
  for (const skill of skillCatalog) {
    if (!cats.includes(skill.category)) {
      cats.push(skill.category);
    }
  }
  return cats;
}

export function getSkillSourcePath(skill) {
  return join(SKILLS_BASE_DIR, skill.dir, 'SKILL.md');
}
