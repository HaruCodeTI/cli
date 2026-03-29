---
name: status-semanal
description: >
  Gera relatório semanal de status dos projetos e pipeline comercial da HaruCode.
  SEMPRE use esta skill quando Ian mencionar "status", "relatório semanal", "como estão
  os projetos", "acompanhamento", "o que aconteceu essa semana", "resumo da semana",
  "update semanal", ou qualquer pedido de visão consolidada do andamento de clientes e
  projetos. Também ative como tarefa agendada de segunda-feira. Use mesmo quando o pedido
  for sobre um cliente específico — o relatório contextualiza com o panorama geral.
  Se Ian perguntar "como está o [cliente]?" ou "tem algum bloqueio?", esta skill ajuda
  a dar uma resposta completa e estruturada.
version: 1.0.0
category: produtividade
access:
  - socio
  - funcionario
---

# Relatório Semanal de Status — HaruCode

## Propósito

Consolidar o status de todos os projetos, clientes e pipeline comercial da HaruCode em um relatório semanal acionável. O relatório é a principal ferramenta de alinhamento entre os três sócios (Ian, Guilherme, Arthur) e deve focar em ações, não em narrativa.

---

## Processo

### 1. Coletar dados

Consultar estas fontes na ordem:

1. **empresa-status.md** — lista atual de clientes e projetos (referência base)
2. **Prospeccao/pipeline-index.md** — visão consolidada do pipeline
3. **Clientes/** — arquivos criados ou modificados na última semana por cliente
4. **Follow-Up/** — follow-ups pendentes e atrasados
5. **Propostas/** — propostas enviadas aguardando retorno
6. **Gmail** (se conector ativo) — comunicações relevantes com clientes nos últimos 7 dias
7. **Google Calendar** (se conector ativo) — reuniões realizadas na semana
8. **Jira** (se conector ativo) — tasks em andamento e concluídas

Se uma fonte não estiver disponível, anotar no relatório e prosseguir com as demais.

### 2. Gerar relatório por cliente

Para cada cliente ativo (consultar empresa-status.md para lista atualizada):

```
### [Nome do Cliente]
**Responsável:** [sócio principal]
**Atividades da semana:** [o que foi feito / movimentado]
**Bloqueios:** [o que está travando progresso, se houver]
**Próximos passos:** [o que precisa acontecer, com responsável e prazo se possível]
**Atenção:** [flags — prazo perto, sem atividade, decisão pendente]
```

Se não houver dados sobre um cliente: "Sem atividade detectada esta semana — verificar com [sócio responsável]"

### 3. Seção de alertas

```
## Atenção

- **Clientes sem atividade na semana:** [listar]
- **Prazos próximos (7 dias):** [listar]
- **Decisões pendentes entre sócios:** [listar]
- **Follow-ups atrasados:** [listar de Follow-Up/]
- **Dados desatualizados detectados:** [listar seções com info possivelmente desatualizada]
```

### 4. Seção comercial

```
## Pipeline Comercial

- **Prospects em andamento:** [listar de Prospeccao/pipeline-index.md]
- **Propostas enviadas aguardando retorno:** [listar de Propostas/]
- **Reuniões agendadas próxima semana:** [listar do Calendar]
- **MRR atual estimado:** [cruzar com empresa-status.md §Financeiro]
```

### 5. Sugestões de ação

Com base no relatório, sugerir as 3-5 ações prioritárias da semana. Classificar:
- Verde: Cowork pode preparar sozinho
- Amarelo: Cowork prepara, Ian/sócio decide
- Vermelho: Só Ian/sócio pode fazer

---

## Output

- Salvar em `Relatorios/Semanais/status-YYYY-MM-DD.md`
- Apresentar resumo estruturado na conversa
- Destinatários: Ian, Guilherme, Arthur
- Tom: direto, sem enrolação, foco em ação
- Atualizar `Prospeccao/pipeline-index.md` se detectar mudanças durante a coleta

---

## Manutenção

Se durante a coleta detectar informação desatualizada em empresa-status.md ou pipeline-index.md, sugerir atualização inline (formato: "Detectei que [X] mudou. Quer que atualize?").
