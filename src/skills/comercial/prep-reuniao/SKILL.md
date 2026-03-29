---
name: prep-reuniao
description: >
  Preparar briefing antes de reunião com prospect, cliente ou parceiro.
  Ativar quando Ian mencionar reunião, meeting, call, encontro,
  ou qualquer referência a preparar-se para conversar com alguém.
version: 1.0.0
category: comercial
access:
  - socio
---

# Preparação de Reunião — HaruCode

## Benchmark (pesquisa-backed)
- Ratio ideal em reunião de vendas: falar 43%, ouvir 57%. O briefing deve preparar o Ian pra OUVIR, não pra apresentar.
- 6-10 perguntas fortes > 25 perguntas fracas. Qualidade das perguntas define a reunião.
- Preparar 1 coisa concreta pra levar (demo, número, case) — tangibiliza a conversa.

## Processo

### 1. Identificar contexto
- Quem é? (prospect novo, cliente ativo, parceiro)
- Qual empresa?
- Qual o objetivo da reunião?
- Se Ian não especificar, perguntar

### 2. Checar TASKS.md
- Buscar em Active e Waiting On por itens relacionados ao contato/empresa
- Pendências abertas que o Ian precisa resolver antes da reunião → destacar
- Follow-ups vencidos com esse contato → incluir no briefing

### 3. Pesquisar (se prospect ou parceiro novo)
- Executar a skill pesquisa-prospect completa
- Checar pipeline-index.md por histórico do prospect
- Incluir: empresa, decisor, dor provável, conexões sociais

### 4. Revisar histórico (se cliente ativo)
- Checar pasta Clientes/[nome]/ por documentos, propostas, notas
- Se pasta não existir: buscar por nome no pipeline-index.md e em outputs de pos-reuniao anteriores (Relatorios/)
- Checar Jira por tasks em andamento (se conector disponível)
- Checar Gmail por últimas comunicações (se conector disponível)
- Resumir: status atual do projeto, pendências, oportunidades

### 5. Montar briefing

Formato:
```
# Briefing — Reunião com [NOME] / [EMPRESA]
Data: [data]
Objetivo: [1 frase]

## Contexto
[2-3 parágrafos com o essencial sobre a pessoa/empresa/histórico]

## Status atual (se cliente existente)
[O que está em andamento, o que foi entregue, pendências]

## Talking points
1. [Ponto principal a abordar]
2. [Segundo ponto]
3. [Terceiro ponto]

## Perguntas pra fazer
1. [Pergunta que extrai informação estratégica]
2. [Pergunta que revela dor]
3. [Pergunta que abre próximo passo]

## Preparar antes
- [1-2 itens acionáveis: proposta rascunhada, número de investimento, case específico, demo pronta]

## O que evitar
- [Tema sensível ou prematuro]

## Próximo passo ideal
[O que seria o melhor resultado dessa reunião]
```

## Ciclo completo
prep-reuniao (antes) → reunião → pos-reuniao (depois) → follow-up-comercial (tracking)

## Integração com plugins
Plugin Sales (call-prep) complementa com pesquisa web e contexto de CRM. Esta skill adiciona: contexto local (pastas, Jira, Gmail), histórico de pipeline, e briefing formatado pro perfil do Ian.

## Output
- Salvar em Relatorios/Briefings/YYYY-MM-DD-[empresa].md
- Apresentar resumo na conversa
