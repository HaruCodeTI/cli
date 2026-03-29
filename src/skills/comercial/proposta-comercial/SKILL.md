---
name: proposta-comercial
description: >
  Ajudar a criar propostas comerciais para clientes da HaruCode.
  Ativar quando Ian mencionar proposta, orçamento, precificação,
  ou pedir para preparar documento comercial para cliente.
version: 1.0.0
category: comercial
access:
  - socio
---

# Proposta Comercial — HaruCode

## Tom
Brand-foundation integral — consultivo, preciso, premium.
Este é o contexto onde a HaruCode se posiciona como parceiro técnico sênior.
O diferencial premium não é no preço — é na clareza de escopo, transparência de trade-offs e delimitação precisa do que está (e não está) incluso.

## Benchmark
Pesquisa mostra que os dois fatores que mais influenciam decisão em propostas B2B são: resultado de negócio esperado (40%) e clareza de preço (40%). Design e extensão importam menos. Tamanho ideal:
- Projeto <R$10K: 1-2 páginas
- Projeto R$10-30K: 3-5 páginas
- Projeto >R$30K: 6-8 páginas
A seção "O que NÃO está incluso" é o que separa proposta consultiva de genérica — nunca pular.

## Processo

### 1. Coletar informações
Carregar contexto:
- empresa-status.md → projetos ativos e time disponível
- pipeline-index.md → histórico do prospect (se existir ficha)
- Clientes/[nome]/ → documentos anteriores (se cliente existente)
- Propostas/Enviadas/ → propostas similares anteriores como referência de estrutura e tom

**Se o Ian vier de uma reunião (fluxo pos-reuniao → proposta):**
- Consultar o registro da pos-reuniao mais recente com esse contato
- Extrair: decisões tomadas, escopo discutido, compromissos assumidos, informações novas
- Usar como base para a proposta — evita reperguntar o que já foi registrado
- Se a pos-reuniao não tiver informação suficiente, perguntar apenas o que falta

Perguntar a Ian (se não fornecido e não disponível via pos-reuniao):
- Quem é o cliente? (empresa, decisor)
- O que foi discutido? (problema, escopo preliminar)
- Qual a complexidade estimada?
- Prazo desejado pelo cliente?
- Modelo de cobrança: retainer, projeto, profit-sharing, parceria?

### 2. Estruturar proposta

**Formato LaTeX (padrão):**
Usar template em Propostas/Templates/template-proposta-v2.tex como base.
Para contratos: Propostas/Templates/template-contrato-v1.tex.
Para documentos técnicos: Propostas/Templates/template-doc-tecnico-v1.tex.

**Problemas visuais conhecidos no LaTeX — prevenir ativamente:**
- Tabelas que quebram entre páginas → usar `[H]` (float) ou `\begin{table}[!htbp]`
- Títulos isolados no fim da página → usar `\needspace{4\baselineskip}` antes de `\section` ou `\subsection` para garantir que título e conteúdo fiquem juntos
- Tabelas com largura excedendo margens → usar `tabularx` com `\textwidth`

**Seções obrigatórias:**

```
# Proposta Comercial — HaruCode → [Cliente]
Data: [data]
Validade: 15 dias

## Contexto
[Resumo do problema do cliente e do que foi discutido]

## Sobre a HaruCode
A HaruCode é uma empresa de soluções tecnológicas sediada em Campo Grande/MS,
especializada em desenvolvimento de software sob medida, automações e integrações
de sistemas. Atendemos empresas do Centro-Oeste nos segmentos de saúde, transporte,
imobiliário e consórcio, com foco em resolver problemas operacionais concretos
com tecnologia.
[Se houver case similar ao projeto proposto, mencionar em 1 frase: "Recentemente
entregamos [projeto similar] para [cliente], com [resultado concreto]."]

## Escopo
[O que será feito — lista clara de entregáveis]

## O que NÃO está incluso
[Delimitar claramente pra evitar escopo indefinido — NUNCA pular esta seção]

## Cronograma
[Fases com estimativas de tempo]
*Prazos sujeitos a validação técnica com o time de desenvolvimento*

## Investimento
[Valor, modelo de cobrança, condições de pagamento]
[Se aplicável: comparação entre opções com trade-offs]
[Apresentar como investimento com retorno, não como custo: "investimento de R$X com break-even estimado em Y meses"]

## Condições
[Forma de pagamento, IP, confidencialidade, suporte pós-entrega]

## Próximos passos
[O que precisa acontecer pra começar]
```

### 3. Nomear trade-offs (quando houver opções)
- Opção A: [escopo] — [valor] — [prazo] — Trade-off: [o que ganha/perde]
- Opção B: [escopo] — [valor] — [prazo] — Trade-off: [o que ganha/perde]
- Recomendação HaruCode: [qual e por quê]
- Refinar com a prática — a medida que mais propostas forem feitas, o formato se ajusta

### 4. Regras
- NUNCA incluir prazo sem nota "sujeito a validação com time técnico"
- Precificação baseada em horas e complexidade — validar valores com Arthur
- Se template LaTeX existir em Propostas/Templates/, usar como base
- Se existir proposta anterior similar em Propostas/Enviadas/, usar como referência de estrutura e tom
- Linguagem técnica precisa, sem buzzwords (voice-and-style.md §3: especificidade mata generalidade)
- Transparente sobre limitações e o que não faz parte do escopo
- Tom consultivo: primeiro demonstra entendimento da dor, depois propõe (voice-and-style.md §3 princípio 2)
- Sem urgência fabricada (voice-and-style.md §3 princípio 7)
- Seção "O que NÃO está incluso" é OBRIGATÓRIA — é o que separa proposta consultiva de proposta genérica

### 5. Validação
- Marcar como RASCUNHO
- Arthur valida valores e escopo técnico (geralmente em tempo real)
- **Envio via WhatsApp (ativo):** após Ian aprovar o rascunho, enviar PDF via webhook n8n. Para arquivos: upload em tmpfiles.org → URL direta → webhook com media_url. Carregar `Contexto/whatsapp-cowork-ops.md` v3.0 para endpoints e fluxo completo. Ian aprova o envio (AMARELO).

### 6. Pós-envio → Follow-up
- Após Ian enviar a proposta, criar entrada em Follow-Up/ com:
  - Data de envio
  - Prazo para primeiro follow-up (3 dias)
  - Prazo para segundo follow-up (7 dias)
- Atualizar pipeline-index.md → status "Proposta enviada"
- A partir daqui, o fluxo segue via follow-up-comercial.md

## Ciclo completo
prep-reuniao (antes) → reunião → pos-reuniao (captura) → **proposta-comercial** (se necessário) → follow-up-comercial (tracking)

## Sales enablement (materiais de apoio à negociação)
Conteúdo pra mandar no WhatsApp durante a negociação — não é pra publicar em rede social. Gerar sob demanda quando a proposta precisar de apoio:
- **One-pager do serviço por vertical:** 1 página com dor → solução → resultado esperado → próximo passo. Salvar em Conteudo/Sales-Enablement/
- **FAQ de objeções comuns:** "é caro", "já tentamos IA", "como garantem resultado?". Respostas consultivas, não defensivas.
- **Comparativo "fazer internamente vs contratar":** tabela com custo, tempo, risco, manutenção.
- **Mini-case anonimizado:** quando tiver resultado mas sem permissão pra nomear o cliente.
Esses materiais são gerados pelo Cowork (VERDE) mas enviados pelo Ian (VERMELHO).

## Integração com plugins
Plugin Sales (create-an-asset) pode gerar materiais complementares (one-pager, landing page) como sugestão quando a proposta precisar de apoio visual — não ativar automaticamente. Esta skill foca no documento comercial principal.

## Integração futura
- WhatsApp: enviar rascunho automaticamente pro Arthur para validação
- GHL: atualizar pipeline via API ao invés de manualmente no pipeline-index.md

## Referências LaTeX disponíveis
- `Propostas/Templates/template-proposta-v2.tex` — template geral de proposta (com seção "Sobre a HaruCode")
- `Propostas/Templates/template-contrato-v1.tex` — template de contrato (baseado no Kyotech)
- `Propostas/Templates/template-doc-tecnico-v1.tex` — template de documento técnico (baseado no Projeto D)
- `Propostas/Enviadas/` — propostas reais anteriores como referência

## Output
- Salvar em Propostas/[nome-cliente]-YYYY-MM-DD.md (ou .tex se LaTeX)
- Marcar como RASCUNHO — validação do Arthur OBRIGATÓRIA antes de enviar
- Criar entrada em Follow-Up/ para tracking pós-envio
- Atualizar pipeline-index.md
