---
name: briefing-matinal
description: >
  Briefing diário matinal para Ian.
  Usar como tarefa agendada (todo dia útil às 8h)
  ou sob demanda quando Ian disser "briefing", "como está meu dia", "o que tenho hoje".
version: 1.0.0
category: produtividade
access:
  - socio
  - funcionario
---

# Briefing Matinal — HaruCode

## Status atual
Funciona sob demanda (Ian pede). Será agendado quando o sistema de produtividade estiver rodando com métricas estáveis.

## Princípios (pesquisa-backed)
- **Máximo 15-20 minutos** de leitura. Se o briefing ficou longo, está errado — cortar informação, não tempo.
- **3 métricas suficientes**: Top 3 da semana + agenda do dia + decisões pendentes. O resto é contexto opcional.
- **Decision queue**: em vez de listar tudo, destacar apenas o que precisa de um sim/não HOJE. Decisões não urgentes vão pro dia seguinte.
- **Evitar briefing fatigue**: se o Ian parar de pedir briefing, o formato precisa ser revisado — está virando ruído.

## Instrução para tarefa agendada
Leia CLAUDE.md e TASKS.md para contexto.

Execute o briefing matinal:

### 1. TOP 3 DA SEMANA (TASKS.md)
- Ler seção "Top 3 da Semana" do TASKS.md
- Se segunda-feira: perguntar ao Ian quais são os 3 resultados da semana (1 comercial, 1 conteúdo, 1 estratégia/operacional)
- Se outro dia: mostrar progresso nos Top 3 definidos na segunda
- Se algum Top 3 não teve avanço em 2+ dias: alertar

### 2. AGENDA (conector Google Calendar)
- Reuniões de hoje e amanhã
- Para cada reunião:
  - Quem, quando, onde (presencial ou remoto)
  - Mini-briefing de 3 linhas: contexto, objetivo, pontos a abordar
  - Se houver material na pasta Clientes/ ou Prospeccao/, referenciar
  - Se houver output de pos-reuniao anterior com mesmo contato, referenciar ações pendentes
- Ao criar reunião pelo Cowork: convidar iantutida@gmail.com + contato externo (se tiver email). Se presencial, convidar somente o Ian.

### 3. TAREFAS ATIVAS (TASKS.md)
- Ler seções "Active" e "Waiting On"
- Destacar itens com prazo próximo ou vencido
- "Waiting On" com mais de 7 dias → alertar como potencial follow-up
- Se mais de 8 itens em Active → sugerir mover algo pra Someday

### 4. CONTEÚDO DA SEMANA (TASKS.md)
- Ler seção "Conteúdo da Semana"
- Mostrar progresso: "Instagram: publicado/pendente | LinkedIn: publicado/pendente (quinzenal)"
- Se quarta e nenhum conteúdo Instagram em andamento → alertar
- LinkedIn é quinzenal — alertar apenas nas semanas em que está planejado

### 5. PULSO WHATSAPP
- Carregar `Contexto/whatsapp-cowork-ops.md` para endpoints e actions
- Via Query Proxy: `{"action": "messages", "since": "<24h atrás>", "limit": 100}`
- Resumir por conversa: grupos (decisões, bloqueios) + individuais relevantes (clientes, parceiros)
- Se houver mensagem que requer ação do Ian → destacar como prioridade
- Mensagens sem resposta (from_me=false sem reply) → alertar
- Se sem atividade relevante → pular seção

### 6. INBOX (conector Gmail — versão mínima)
- Verificar apenas emails de clientes, parceiros e prospects (ignorar newsletters/notificações)
- Se houver email urgente → alertar e redigir rascunho de resposta
- Se inbox vazio/só newsletters → pular seção

### 7. EQUIPE (conector Jira — visão de desempenho)
- **Jira cloudId:** `381c3ad5-15ff-47a7-9a6e-3c305637de3f` (haru-code.atlassian.net)
- JQL útil: `updated >= -1d ORDER BY updated DESC` (cards movidos ontem/hoje)
- Cards movidos ontem/hoje (entregas, progresso)
- Bloqueios sinalizados que impactam entregas a clientes
- Resumo rápido: [projeto] → [status] → se precisa de ação do Ian
- NÃO listar tasks técnicas internas — focar em entregas e bloqueios

### 8. FOLLOW-UPS PENDENTES
- Verificar TASKS.md seção "Waiting On" por itens comerciais
- Cruzar com pipeline-index.md para contexto consolidado
- Listar quem precisa de follow-up hoje
- Sugerir ação pra cada um (referenciar templates-whatsapp.md quando aplicável)

### 9. PRIORIDADES DO DIA
Com base em tudo acima, sugerir as 3 ações mais importantes do dia.
Critério: o que move os Top 3 da semana pra frente?
Classificar por cor (alinhado com working-rules.md §1):
- 🟢 Cowork pode preparar sozinho (VERDE)
- 🟡 Cowork prepara opções, Ian decide (AMARELO)
- 🔴 Só Ian pode fazer (VERMELHO)

## Fluxo semanal

| Dia | Foco extra no briefing |
|-----|----------------------|
| **Segunda** | Definir Top 3 da semana. Resetar "Conteúdo da Semana". Limpar Done. |
| **Terça-Quinta** | Progresso nos Top 3. Alertas de conteúdo se atrasando. |
| **Sexta** | Review da semana: Top 3 bateu? Por quê não? Padrões? Mover Done. |

## Integração com plugins
Plugin Sales (daily-briefing) complementa com visão de pipeline. Plugin Productivity (task-management) lê/escreve no mesmo TASKS.md. Quando ambos ativarem, combinar outputs em briefing único.

## Integração com outras skills
- **pos-reuniao** → compromissos extraídos viram tasks em TASKS.md (Active ou Waiting On)
- **proposta-comercial** → follow-up pós-envio vira task em TASKS.md (Waiting On)
- **brain-dump-parser** → tarefas identificadas no brain dump viram tasks (com confirmação do Ian)

### Output
- Salvar em Relatorios/briefing-YYYY-MM-DD.md
- Apresentar resumo estruturado na conversa
- Se segunda: atualizar TASKS.md com novos Top 3
