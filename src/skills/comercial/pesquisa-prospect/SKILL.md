---
name: pesquisa-prospect
description: >
  Pesquisar empresa e decisor para abordagem comercial da HaruCode.
  Ativar quando Ian mencionar pesquisar prospect, lead, preparar abordagem,
  levantar informações sobre empresa ou pessoa para fins comerciais,
  ou qualquer menção a consórcio, imobiliária, saúde como vertical de prospecção.
version: 1.0.0
category: comercial
access:
  - socio
---

# Pesquisa de Prospect — HaruCode

## Benchmark
Pesquisa ideal: 15-20 minutos por prospect. Mais que isso = diminishing returns. Menos = abordagem genérica. Foco em qualidade, não volume. Warm intros (indicação) convertem 3-5x mais que cold outreach no Centro-Oeste.

## Processo

### 1. Pesquisar a EMPRESA
- O que faz, tamanho, localização, presença digital (site, redes, Google Business)
- Notícias recentes, mudanças de liderança, vagas abertas
- Tecnologias visíveis (usa CRM? tem WhatsApp Business? site tem chat?)
- Dores prováveis baseadas no setor e tamanho
- Pra consórcio: número de grupos ativos, se tem base de clientes grande, sinais de gestão manual
- Pra imobiliária: volume de imóveis, se tem atendimento automatizado ou manual
- Pra saúde: tipo de equipamento/serviço, se tem processo digital ou tudo manual

### 2. Pesquisar o DECISOR (tão importante quanto a empresa)
- Nome, cargo, tempo na posição
- Perfil LinkedIn (atividade recente, posts, interações, temas que comenta)
- Conexões em comum com Ian, Guilherme, Arthur ou Nathan
- Outros canais: Instagram profissional, participação em eventos
- Estilo de comunicação observável (formal? casual? técnico?) → adaptar abordagem
- O que ele VALORIZA: buscar posts/comentários que revelam prioridades (custo? inovação? controle?)

### 3. Cruzar com contexto HaruCode
- Qual vertical? (consórcio, imobiliária, saúde, outro)
- Qual dor a HaruCode resolve melhor pra esse perfil?
- Existe case similar nos clientes atuais? (BR Consult pra imobiliária, Integra/Kyotech pra saúde)
- Existe conexão social? (Nathan, cliente existente, evento em comum)

### 4. Gerar FICHA DO PROSPECT
Formato tabela:
| Campo | Dados |
|-------|-------|
| Empresa | |
| Decisor | |
| Cargo | |
| Localização | |
| Vertical | |
| Tamanho estimado | |
| Presença digital | |
| Dor provável | |
| Solução HaruCode relevante | |
| Case similar | |
| Conexão social | |
| Score de fit (1-10) | |
| Ângulo de abordagem | |

### 5. Gerar RASCUNHO DE MENSAGEM
- Default: **WhatsApp** (Centro-Oeste prioriza WhatsApp — voice-and-style.md §2). Usar email apenas se o prospect for institucional/gov ou se Ian pedir explicitamente.
- Se tem conexão social → usar template "Prospecção com referência" (templates-whatsapp.md)
- Se não tem → usar template "Prospecção fria" (templates-whatsapp.md)
- Aplicar copy principles de voice-and-style.md §3 (especificidade, problema antes de solução, 1 CTA)
- NUNCA enviar — salvar como rascunho

### 6. Atualizar pipeline
- Adicionar prospect em Prospeccao/pipeline-index.md com status "Pesquisado"
- Se vertical nova, criar entrada na seção correspondente

## Integração com plugins
Quando o plugin Sales estiver disponível, a skill `account-research` complementa esta pesquisa com dados de enriquecimento. Fluxo: esta skill define O QUE pesquisar (contexto HaruCode, verticais, conexões locais) → plugin executa a pesquisa web → resultado volta formatado na ficha.

## Output
- Salvar ficha em Prospeccao/[vertical]/[nome-empresa].md
- Rascunho de mensagem no mesmo arquivo
- Atualizar pipeline-index.md
- Apresentar resumo na conversa
