---
name: follow-up-comercial
description: >
  Gerenciar follow-ups com prospects e clientes da HaruCode.
  Ativar quando Ian mencionar follow-up, cobrar retorno, lembrar de mandar mensagem,
  verificar quem não respondeu, ou quando executado como tarefa agendada.
version: 1.0.0
category: comercial
access:
  - socio
---

# Follow-Up Comercial — HaruCode

## Status atual
**WhatsApp integrado via Query Proxy n8n.** Leitura de todas as mensagens (grupos e individuais) ativa. Envio de mensagens e arquivos via webhook (AMARELO — Ian aprova). Para envio de arquivos, ver fluxo completo em `Contexto/whatsapp-cowork-ops.md` v3.0.

Hoje funciona:
- Sob demanda (Ian pede "quem precisa de follow-up?") com base em TASKS.md, pipeline-index.md e WhatsApp
- Query Proxy permite buscar conversas individuais com clientes → detecta mensagens sem resposta
- Como referência de processo e cadência

O valor completo aparece quando:
1. Tarefa agendada → roda toda segunda e gera relatório sem o Ian pedir
2. Cruzamento automático pipeline + WhatsApp → alerta proativo de follow-ups atrasados

## Problema que resolve
Hoje não existe rotina de follow-up — é baseado em "lembrar de mandar mensagem".
Essa skill cria um sistema simples de tracking.

## Benchmark (dados de pesquisa)
- 80% dos fechamentos exigem 5+ pontos de contato — mas 44% dos vendedores desistem após o 1º e 92% após o 4º
- Cadência ideal pós-proposta: 18-21 dias com 3-5 touchpoints (não 2)
- No Brasil, WhatsApp >>> email pra follow-up (taxa de resposta 3-5x maior)
- Prospects que não respondem não são perdidos — backlog trimestral reativa 10-15% dos leads frios

## Processo

### 1. Verificar pendências
- Ler pasta Follow-Up/Prospects-Ativos/ por fichas de prospect
- Ler pasta Follow-Up/Clientes/ por pendências
- Checar Gmail por emails enviados sem resposta nos últimos 3-7 dias (se conector ativo)
- Cruzar com Propostas/Enviadas/ por propostas sem retorno

### 2. Classificar por urgência
- **URGENTE** (>7 dias sem resposta + proposta enviada): risco de esfriar
- **NORMAL** (3-7 dias sem resposta): momento de retomar
- **MONITORAR** (<3 dias): ainda dentro do prazo normal

### 3. Gerar rascunhos de follow-up
Para cada item urgente e normal:
- Usar templates de templates-whatsapp.md:
  - "Follow-up (sem resposta)" para prospects
  - "Follow-up pós-proposta" para propostas enviadas
  - "Cliente ativo — alerta" para clientes com pendência
- Tom: leve, sem pressão ("vi que ficou em aberto, queria entender se faz sentido continuar")
- Referenciar o último ponto de contato ("na nossa última conversa sobre X...")
- Aplicar copy principles (voice-and-style.md §3): especificidade, 1 CTA, sem urgência fabricada
- NUNCA: urgência fabricada, "estou entrando em contato novamente", "gostaríamos de saber se..."

### 4. Cadência por tipo de prospect
- **Proposta enviada (indicação/referência):**
  - Dia 3: check leve ("viu a proposta? alguma dúvida?")
  - Dia 7: valor adicional (FAQ, comparativo, ou dado novo relevante)
  - Dia 14: reframe ("entendo que timing é importante, posso ajustar algo no escopo?")
  - Dia 21: encerramento (mensagem de porta aberta)
- **Proposta enviada (sem indicação):** cadência mais curta — dia 3, dia 7, encerramento dia 14
- **Prospect frio (sem indicação, sem proposta):** se não respondeu ao primeiro contato, mover direto pra backlog — sem follow-up persistente
- Nota: pesquisa mostra que o valor real está nos follow-ups 3-5 (onde a maioria desiste). Persistência consultiva ≠ insistência.

### 5. Encerramento (quando follow-ups se esgotam)
- Após 2 follow-ups de proposta sem resposta → enviar mensagem de encerramento:
  - Tom: leve, sem ressentimento, porta aberta
  - Modelo: "[nome], como não tive retorno, vou entender que o timing não é agora. Se fizer sentido no futuro, fico à disposição. Abraço."
- Mover prospect pra backlog frio em pipeline-index.md (status "Frio — sem resposta")

### 6. Backlog frio (reativação futura)
- Prospects encerrados não são descartados — ficam em pipeline-index.md com status "Frio"
- Revisar backlog frio trimestralmente ou quando houver:
  - Case novo na vertical do prospect
  - Contato social inesperado (evento, indicação)
  - Mudança de contexto no mercado do prospect
- Reativação usa template de prospecção com referência (templates-whatsapp.md), ancorado no novo contexto

### 7. Atualizar tracking
- Marcar data do follow-up na ficha do prospect/cliente
- Se 3+ follow-ups sem resposta → mover pra "frio" com nota
- Atualizar pipeline-index.md com novo status

## Integração WhatsApp
- **Fase 1 (ativa):** leitura de grupos. Sem detecção automática de follow-ups individuais.
- **Fase 2 (futura):** leitura de conversas individuais → detectar mensagens sem resposta automaticamente, gerar alerta
- **Tarefa agendada:** rodar toda segunda como parte do briefing semanal (quando ativada)
- **CRM:** cadência de follow-up automática por tipo de prospect (futuro)

## Integração com plugins
Plugin Sales (pipeline-review) complementa esta skill com visão consolidada de saúde do pipeline. Esta skill foca na execução tática (gerar rascunhos, tracking individual). O plugin foca na visão estratégica (priorização, riscos, ação semanal).

## Output
- Lista de follow-ups pendentes com rascunhos prontos
- Salvar em Follow-Up/relatorio-follow-up-YYYY-MM-DD.md
- Atualizar pipeline-index.md
- Apresentar resumo na conversa pra Ian aprovar/ajustar antes de enviar
