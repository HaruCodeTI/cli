---
name: whatsapp-cowork-ops
description: >
  Guia operacional para o Cowork interagir com o WhatsApp comercial da HaruCode.
  Ler mensagens, gerar relatórios, enviar mensagens. Contém todos os endpoints,
  credenciais e regras necessárias.
status: "[VALIDADO]"
versao: 2.0
atualizado: 2026-03-25
---

# WhatsApp — Guia Operacional do Cowork

## TL;DR

O Cowork tem acesso de leitura a **todas as mensagens** do WhatsApp comercial (número HaruCodeMainCel) via proxy n8n, e pode **enviar mensagens** via webhook n8n — com aprovação do Ian.

**Método principal de acesso: Query Proxy via n8n** (não acessar Supabase diretamente — bloqueado pelo sandbox).

---

## 1. Autonomia

| Ação | Nível | Comportamento |
|------|-------|---------------|
| Ler mensagens via proxy | **VERDE** | Faz sozinho, sem perguntar |
| Gerar relatório de mensagens | **VERDE** | Faz sozinho |
| Resumir conversas | **VERDE** | Faz sozinho |
| Enviar mensagem interna (para Ian/sócios) | **AMARELO** | Ian aprova antes de enviar |
| Enviar mensagem para clientes/prospects | **AMARELO** | Ian aprova antes de enviar |
| Enviar documento/mídia pelo WhatsApp | **AMARELO** | Ian aprova antes de enviar |

---

## 2. Ler mensagens (Query Proxy via n8n)

### Endpoint

```
POST https://n8n.harucode.com.br/webhook/whatsapp-query
Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI
Content-Type: application/json
```

O proxy consulta o Supabase internamente e retorna os resultados. **Sempre usar este endpoint** — chamadas diretas ao Supabase são bloqueadas pelo sandbox.

### Actions disponíveis

#### `messages` — Buscar mensagens com filtros

```json
{
  "action": "messages",
  "limit": 50,
  "since": "2026-03-18T00:00:00Z",
  "remote_jid": "556799587200@s.whatsapp.net",
  "is_group": false,
  "from_me": false,
  "sender_name": "Ian",
  "content_search": "proposta"
}
```

Todos os filtros são opcionais. Sem filtros, retorna as 50 mensagens mais recentes.

| Filtro | Tipo | Descrição |
|--------|------|-----------|
| `limit` | number | Máximo de resultados (default: 50) |
| `since` | string ISO | Mensagens a partir desta data |
| `remote_jid` | string | Filtrar por contato/grupo específico |
| `is_group` | boolean | Só grupos (`true`) ou só contatos (`false`) |
| `from_me` | boolean | Só enviadas (`true`) ou só recebidas (`false`) |
| `sender_name` | string | Busca parcial no nome do remetente |
| `content_search` | string | Busca parcial no conteúdo da mensagem |

#### `contacts` — Listar contatos/grupos

```json
{
  "action": "contacts",
  "limit": 20,
  "name": "Ian",
  "is_group": false
}
```

| Filtro | Tipo | Descrição |
|--------|------|-----------|
| `limit` | number | Máximo de resultados (default: 20) |
| `name` | string | Busca parcial no nome |
| `is_group` | boolean | Só grupos ou só contatos |

#### `conversation` — Conversa completa com um contato

```json
{
  "action": "conversation",
  "remote_jid": "556799587200@s.whatsapp.net",
  "since": "2026-03-18T00:00:00Z",
  "limit": 100
}
```

Retorna mensagens em ordem cronológica (asc). `remote_jid` é obrigatório.

#### `stats` — Estatísticas do período

```json
{
  "action": "stats",
  "since": "2026-03-18T00:00:00Z",
  "limit": 1000
}
```

Retorna todas as mensagens do período para o Cowork processar (agrupar, contar, resumir).

### Formato de resposta (todas as actions)

```json
{
  "action": "messages",
  "total_count": 153,
  "returned": 50,
  "data": [
    {
      "message_id": "ABC123",
      "remote_jid": "556799587200@s.whatsapp.net",
      "from_me": false,
      "sender": "556799587200@s.whatsapp.net",
      "sender_name": "Arthur",
      "message_type": "text",
      "content": "Oiiii",
      "is_group": false,
      "group_name": null,
      "timestamp": "2026-03-25T21:12:06+00:00"
    }
  ]
}
```

### Campos das mensagens

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `message_id` | text | ID único da mensagem |
| `remote_jid` | text | Identificador do contato/grupo |
| `from_me` | boolean | `true` = enviada por nós, `false` = recebida |
| `sender` | text | JID de quem enviou (em grupos, diferente do remote_jid) |
| `sender_name` | text | Nome de exibição do remetente |
| `message_type` | text | `text`, `image`, `document`, `audio`, `video`, `sticker`, `reaction` |
| `content` | text | Texto da mensagem. Áudio = `[audio]`, sticker = `[sticker]` |
| `is_group` | boolean | Se veio de um grupo |
| `group_name` | text | Nome do grupo (ex: "HaruCode") |
| `timestamp` | timestamptz | Quando a mensagem foi enviada |

### Exemplos de uso (curl)

**Mensagens dos últimos 7 dias:**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-query' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{"action": "messages", "since": "2026-03-18T00:00:00Z", "limit": 100}'
```

**Conversas do Ian:**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-query' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{"action": "messages", "sender_name": "Ian", "limit": 30}'
```

**Listar todos os contatos:**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-query' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{"action": "contacts"}'
```

**Conversa completa com um contato específico:**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-query' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{"action": "conversation", "remote_jid": "556799587200@s.whatsapp.net", "since": "2026-03-18T00:00:00Z"}'
```

### Fuso horário

Os timestamps retornados pelo proxy vêm em **UTC (+00:00)**. Campo Grande/MS usa **GMT-4 (America/Campo_Grande)**.

**Regra:** ao exibir horários para o Ian, SEMPRE converter de UTC para GMT-4 (subtrair 4 horas). Exemplo: `2026-03-25T23:10:08+00:00` → `25/03 às 19:10`.

**Melhoria futura:** converter no próprio n8n Query Proxy com `AT TIME ZONE 'America/Campo_Grande'` na query SQL.

### Como processar os dados

1. **Buscar mensagens** via proxy com filtros de período e/ou contato
2. **Converter timestamps** de UTC para GMT-4 antes de exibir
3. **Agrupar em memória** por contato/grupo
4. **Resumir** — não fazer dump de mensagens. Montar resumo executivo
5. **Cruzar com contexto** — usar `empresa-status.md` para identificar mensagens de clientes ativos
6. **Limitar por default** a 30 dias. Só ir além se solicitado explicitamente

### Transcrição de áudios

Áudios recebidos são automaticamente transcritos via **Groq Whisper** (whisper-large-v3, idioma PT).

- O campo `content` de mensagens de áudio contém: `[transcrição] texto transcrito do áudio...`
- O `message_type` continua `"audio"` para diferenciar de mensagens de texto
- Áudios anteriores à ativação (25/mar/2026) ficam como `[audio]` sem transcrição

Para buscar só áudios transcritos:

```json
{"action": "messages", "message_type": "audio"}
```

**Limitações da transcrição:**

- Whisper pode errar nomes próprios, termos técnicos e gírias regionais
- Áudios muito curtos (<1s) podem não transcrever
- Se o Groq estiver fora, o áudio é salvo como `[audio - transcrição indisponível]`

### Limitações gerais

- **Vídeo:** não é baixado nem processável
- **Alto volume:** se uma consulta retornar centenas de mensagens, resumir em vez de listar
- **JID:** números são no formato `5567999999999@s.whatsapp.net` — grupos são `xxxxx@g.us`
- **Storage:** bucket `whatsapp-media` no Supabase (free tier = 1GB). Monitorar uso.

---

## 3. Enviar mensagens (n8n webhook)

### Endpoint

```
POST https://n8n.harucode.com.br/webhook/whatsapp-send
Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI
Content-Type: application/json
```

### Body — Texto simples

```json
{
  "to": "556799587200",
  "message": "Texto da mensagem"
}
```

### Body — Com mídia (documento, imagem)

```json
{
  "to": "556799587200",
  "message": "Caption ou descrição",
  "media_url": "https://url-do-arquivo.pdf",
  "media_type": "document",
  "filename": "proposta.pdf"
}
```

**media_type aceitos:** `document`, `image`, `video`, `audio`

### Formato do número

- Apenas dígitos com DDI+DDD: `556799587200`
- O workflow formata automaticamente para JID (`@s.whatsapp.net`)
- Funciona com ou sem o `@s.whatsapp.net`

### Fluxo de uso

```
1. Ian solicita envio de mensagem
2. Cowork prepara o conteúdo (rascunho)
3. Ian APROVA o envio (pode ser implícito se Ian pediu diretamente "manda pra mim")
4. Cowork executa o curl para o webhook
5. Cowork confirma o envio (mostra retorno da API)
```

**Regra:** se Ian pedir explicitamente pra enviar ("manda no meu WhatsApp", "envia pro Arthur"), a aprovação é implícita — não precisa confirmar de novo. Se o Cowork gerar um rascunho proativamente, apresentar antes de enviar.

### Mensagens encaminháveis (envio em partes)

Quando a mensagem pode ser encaminhada pelo destinatário (ex: rascunho pra validação no grupo de sócios, depois encaminhado ao cliente), **dividir em mensagens separadas**:

1. **Primeira mensagem:** contexto interno (o que está acontecendo, por que estamos mandando — NÃO encaminhável)
2. **Mensagens seguintes:** cada bloco lógico da resposta em uma mensagem separada (encaminháveis individualmente)

Isso permite que o destinatário encaminhe apenas as partes relevantes sem precisar copiar/colar.

**Exemplo de divisão:**
- Msg 1: contexto interno ("O cliente X mandou feedback dizendo Y. Rascunho pra validação:")
- Msg 2: abertura/saudação
- Msg 3: corpo principal
- Msg 4: proposta de valor / posicionamento
- Msg 5: encerramento

### Enviar arquivos via WhatsApp

O webhook aceita `media_url` — o arquivo precisa estar acessível via URL pública. Arquivos locais do Cowork (`.md`, `.pdf`, etc.) não são acessíveis diretamente. Fluxo:

**1. Gerar o arquivo** (PDF, DOCX, etc.) na pasta do Cowork
**2. Hospedar temporariamente** via tmpfiles.org:
```bash
curl -s -F "file=@/caminho/do/arquivo.pdf" https://tmpfiles.org/api/v1/upload
# Retorna: {"status":"success","data":{"url":"http://tmpfiles.org/XXXXX/arquivo.pdf"}}
```
**3. Converter URL para download direto** — adicionar `/dl/` após o domínio:
```
http://tmpfiles.org/XXXXX/arquivo.pdf → https://tmpfiles.org/dl/XXXXX/arquivo.pdf
```
**4. Enviar via webhook:**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-send' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "556791022613",
    "message": "Descrição do arquivo",
    "media_url": "https://tmpfiles.org/dl/XXXXX/arquivo.pdf",
    "media_type": "document",
    "filename": "Nome-Do-Arquivo.pdf"
  }'
```

**Notas:**
- tmpfiles.org expira em ~60 minutos — suficiente para entrega
- Funciona com PDF, DOCX, XLSX, imagens
- Para arquivos `.md`, converter para PDF antes (reportlab ou pandoc)
- **Melhoria futura:** hospedar no Supabase Storage (precisa de service role key)

### Casos de uso

**Ian pede resumo no WhatsApp:**
```
Ian: "manda o relatório no meu WhatsApp"
→ Cowork gera PDF → hospeda no tmpfiles → envia via webhook
```

**Envio de proposta para Arthur (revisão técnica):**
```bash
curl -s -X POST 'https://n8n.harucode.com.br/webhook/whatsapp-send' \
  -H 'Authorization: Bearer xYMTb9LryEJB40bf6HyaS1Mt98HI' \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "556799587200",
    "message": "Arthur, proposta para revisão — [Nome do Cliente]",
    "media_url": "https://tmpfiles.org/dl/XXXXX/proposta.pdf",
    "media_type": "document",
    "filename": "Proposta-ClienteX.pdf"
  }'
```

---

## 4. Relatórios (skill status-semanal)

A skill `status-semanal` (`Contexto/skills/status-semanal.md`) inclui a seção **"Pulso WhatsApp da semana"** que usa estes dados. Ao gerar o relatório semanal:

1. Chamar `{"action": "stats", "since": "<7 dias atrás>"}` via proxy
2. Agrupar por contato/grupo, contar enviadas vs recebidas
3. Identificar conversas sem resposta (from_me = false sem from_me = true subsequente no mesmo remote_jid)
4. Cruzar top conversas com clientes ativos (empresa-status.md)
5. Resumir destaques em 2-3 linhas por conversa relevante

---

## 5. Consultas ad-hoc (exemplos de pedidos do Ian)

| Pedido | Action + Filtros |
|--------|-----------------|
| "Resumo das conversas com o cliente X na última semana" | `contacts` (buscar por nome) → `conversation` (remote_jid + since) → resumir |
| "O que rolou no grupo interno hoje?" | `messages` (is_group=true, since=hoje) → resumir |
| "Quais contatos mandaram mensagem essa semana?" | `contacts` → listar ordenados por last_message_at |
| "Me mostra as últimas mensagens do Arthur" | `messages` (sender_name="Arthur", limit=20) |
| "Tem alguma mensagem sem resposta?" | `stats` (since=7 dias) → agrupar por remote_jid → filtrar onde não tem from_me=true |
| "Quantas mensagens tivemos essa semana?" | `stats` (since=7 dias) → total_count na resposta |
| "Busca mensagens sobre proposta" | `messages` (content_search="proposta") |

### Padrão de resposta

Sempre responder com dados estruturados:
- Período analisado
- Volume (total, enviadas, recebidas)
- Resumo por conversa (não dump de mensagens)
- Alertas (sem resposta, volume incomum)

---

## 6. Infraestrutura (referência)

| Componente | Localização | ID/Info |
|------------|-------------|---------|
| Evolution API | `evolutionapi.harucode.com.br` | Instância: HaruCodeMainCel |
| n8n | `n8n.harucode.com.br` | VPS Digital Ocean |
| Supabase | `eiufcqeolesrqhedwbhc.supabase.co` | Projeto: harucode-cowork |
| Workflow Ingestion | n8n | ID: `bCT5aOebR1iePrDB` |
| Workflow Send | n8n | ID: `gHXQ80dHrIXt7LeR` |
| Workflow Query Proxy | n8n | ID: `LmrZMhcvLhzio3JO` |
| Jira Cloud ID | Atlassian | `381c3ad5-15ff-47a7-9a6e-3c305637de3f` |
| Jira Site | Atlassian | `haru-code.atlassian.net` |

### O que acontece automaticamente

- Toda mensagem recebida/enviada no número HaruCodeMainCel é capturada
- Evolution API → webhook → n8n (normaliza + busca nome do grupo) → Supabase (persiste)
- Nomes de grupos são buscados automaticamente via Evolution API
- O Cowork não precisa fazer nada para a captura funcionar

### O que o Cowork faz sob demanda

- Consulta mensagens via Query Proxy (leitura)
- Gera relatórios e resumos
- Envia mensagens e arquivos via webhook n8n (Ian aprova)

---

## Changelog

| Data | Versão | O que mudou |
|------|--------|-------------|
| 2026-03-25 | 1.0 | Criação — integração Evolution API + n8n + Supabase operacional |
| 2026-03-25 | 2.0 | Query Proxy via n8n (resolve bloqueio sandbox), nome de grupo via Evolution API, fix upsert contacts, refactor completo da seção de leitura |
| 2026-03-25 | 3.0 | Envio WhatsApp: VERMELHO→AMARELO (Ian aprova, não Arthur). Documentado envio de arquivos (tmpfiles.org + webhook). Adicionado fuso horário GMT-4. Jira cloudId registrado. |
