---
name: conteudo-blog
description: >
  Gerar artigos de blog otimizados pra SEO para o site harucode.com.br.
  Ativar quando Ian mencionar blog, artigo, SEO, conteúdo pro site,
  ou pedir para criar conteúdo para qualquer vertical (consórcio, imobiliária, saúde).
version: 1.0.0
category: conteudo
access:
  - socio
  - funcionario
---

# Geração de Artigo de Blog — HaruCode

## Status do canal
**Blog está PAUSADO** até Google Analytics + Search Console estarem configurados no site.

Quando ativar: publicar 3 artigos (1 por vertical), medir volume real de busca e tráfego por 60 dias. Se tráfego orgânico irrelevante, redirecionar esforço (voice-and-style.md §2).

Enquanto pausado, esta skill é usada apenas para os **3-5 artigos de credencial** do site (20% do esforço, one-shot).

## Benchmark (pesquisa-backed)
- ROI de SEO B2B: 702% em 12-18 meses. Primeiros leads qualificados entre 12-16 semanas após publicação.
- SEO local funciona especialmente bem pra B2B com venda presencial (caso da HaruCode em Campo Grande).
- Modelo recomendado: topic cluster (1 pillar page + 3-5 cluster articles por vertical).
- Keywords: priorizar problem-based ("como reduzir retrabalho em consórcio") > service-based ("automação RPA Campo Grande").

## Dois tipos de artigo
**1. Credential articles (prioridade imediata)**
Artigos que existem não pra gerar tráfego, mas pra quando o prospect visitar o site e encontrar conteúdo que transmita competência. Escrever ANTES de vender pra aquela vertical.
- Ex: "Erros comuns ao escolher solução de automação", "Checklist de segurança de dados pra imobiliárias"
- Tom: autoridade, não venda. O artigo responde objeções antes da reunião.

**2. SEO articles (quando blog ativar)**
Artigos otimizados pra tráfego orgânico. Funcionam com topic cluster: 1 pillar page (2000-2500 palavras) + 3-5 cluster articles (800-1200 palavras) linkados entre si.

## Estratégia: 3 verticais em teste simultâneo
- Consórcio + IA/automação
- Imobiliária + IA/automação
- Saúde/clínicas + IA/automação
- Fase 1 (credential): 1-2 artigos por vertical como credencial do site. **Priorizar a vertical com mais pipeline ativo** (ver pipeline-index.md).
- Fase 2 (SEO): 1 pillar page + 3 clusters por vertical, medir tráfego, dobrar no que funcionar. Integrar produção no calendario-editorial.md quando ativar.
- Timeline realista: mês 1-3 = foundation (sem tráfego). Mês 4-8 = crescimento. Mês 9+ = primeiros leads de SEO.

## Critério de ativação do blog (go/no-go)
1. Configurar Google Analytics + Search Console no site
2. Publicar 3 credential articles (1 por vertical)
3. Esperar 60 dias medindo tráfego orgânico
4. **Go:** tráfego orgânico >100 visitas/mês ou pelo menos 1 lead vindo do blog → ativar SEO articles, incluir no calendario-editorial.md
5. **No-go:** tráfego irrelevante e zero leads → redirecionar esforço pra canais com retorno comprovado (Instagram/LinkedIn). Reavaliar em 6 meses.

## Publicação (futuro)
Site custom com repo no GitHub. Fluxo planejado:
1. Claude escreve artigo seguindo esta skill → salva como rascunho
2. Ian revisa e aprova
3. Push automático pro repo via Claude Code ou n8n → deploy automático (CI/CD)
Pré-requisito: integração Git configurada. Documentar setup quando ativar.

## Processo

### 1. Definir keyword
- Priorizar problem-based e cauda longa
- BOM: "como reduzir retrabalho em administradora de consórcio" (linguagem do decisor)
- RUIM: "como usar inteligência artificial no seu negócio" (genérico)
- RUIM: "integração de API" (linguagem de dev, decisor não busca isso)
- Se Ian não especificar keyword, pesquisar na web e sugerir 3 opções com justificativa
- Fontes: Google Autocomplete, "People Also Ask", Search Console (quando ativo)

### 2. Pesquisar contexto
- Buscar na web: o que já existe sobre esse tema em português?
- Identificar ângulos não cobertos ou mal cobertos
- Levantar dados, estatísticas ou cases que enriqueçam o artigo

### 3. Escrever artigo
- Título: responde uma pergunta real, inclui keyword principal
- Meta description: máximo 155 caracteres, com keyword
- Introdução: hook com a dor do leitor (2-3 parágrafos)
- 3-5 seções com H2
- Exemplos práticos ou dados concretos em cada seção
- Quando possível: referenciar experiência real da HaruCode
- Quando não houver: usar dados de mercado com fonte
- Conclusão com CTA (agendar conversa, conhecer o serviço)
- Pillar pages: 2000-2500 palavras. Cluster articles: 800-1200 palavras. Credential articles: 1000-1500 palavras.
- Escrever em português real, não traduzido do inglês. "Reduzir retrabalho" > "Otimizar processos". "Conectar sistemas" > "Integração de API".

### 4. Tom
- Educativo, prático, acessível pra decisor que não é técnico
- Seguir voice-and-style.md — tom público (especialistas que mostram o trabalho)
- Sem jargão desnecessário, sem promessas vagas
- Impacto concreto > teoria

## Copy principles aplicáveis (voice-and-style.md §3)
- Especificidade mata generalidade — cada seção com dado concreto ou processo real
- Problema antes de solução — título responde a dor do prospect, não descreve a tecnologia
- Tom consultivo — educativo, não vendedor. CTA no final, não no meio
- Técnico na medida certa — resultado operacional, não jargão de dev
- Prova social por proximidade — citar Campo Grande, contexto regional quando possível

## Integração com plugins
Plugin Marketing (draft-content, content-creation, seo-audit) complementa com pesquisa de keywords e formatação SEO. Esta skill fornece contexto HaruCode (verticais, tom, experiências reais) que o CLAUDE.md injeta antes do plugin executar.

## Output
- Salvar em Conteudo/Blog/[Vertical]/YYYY-MM-DD-titulo-slug.md
- Incluir no início: keyword principal, meta description, vertical
- Apresentar resumo na conversa
- Marcar como RASCUNHO pra revisão
