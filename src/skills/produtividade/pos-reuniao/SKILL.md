---
name: pos-reuniao
description: >
  Captura notas, decisões, ações e próximos passos após reunião com prospect, cliente
  ou parceiro da HaruCode. SEMPRE use esta skill quando Ian mencionar "tive uma reunião",
  "acabei de sair de uma call", "notas da reunião", "o que ficou da reunião", "resumo
  da reunião", "ata", "post-meeting", ou colar notas brutas / transcrição de uma reunião.
  Também ative quando Ian relatar o que aconteceu em um encontro ("falei com o fulano
  hoje", "conversei com a empresa X") — mesmo que não use a palavra "reunião". Se o
  contexto indica que Ian acabou de interagir com alguém de fora da empresa e quer
  registrar ou processar o que aconteceu, esta skill se aplica. Funciona junto com
  prep-reuniao (antes) e follow-up-comercial (depois) para fechar o ciclo completo.
version: 1.0.0
category: produtividade
access:
  - socio
  - funcionario
---

# Pós-Reunião — Captura e Processamento

## Propósito

Fechar o ciclo de reuniões: prep-reuniao prepara antes, esta skill captura depois, follow-up-comercial acompanha o desdobramento. Sem este passo, decisões e compromissos se perdem entre a reunião e a próxima ação.

---

## Processo

### 1. Coletar informações

Se Ian fornecer notas brutas ou transcrição, processar com o brain-dump-parser primeiro (se aplicável).

Se não fornecer, perguntar (cirurgicamente, não tudo de uma vez):
- Com quem foi a reunião? (nome, empresa, cargo)
- Qual era o objetivo?
- O que foi decidido?
- Quais compromissos foram assumidos (por ambos os lados)?

### 2. Consultar contexto existente

Verificar se existe material pré-reunião:
- `Relatorios/Briefings/` — briefing preparado via prep-reuniao
- `Prospeccao/[vertical]/[empresa].md` — ficha do prospect
- `Clientes/[nome]/` — histórico do cliente

Cruzar: o que foi planejado vs. o que aconteceu. Notar desvios relevantes.

### 3. Gerar registro estruturado

```
# Registro — Reunião com [NOME] / [EMPRESA]
Data: [data]
Participantes: [quem participou]
Tipo: [discovery / follow-up / negociação / kickoff / alinhamento / outro]

## Resumo executivo
[2-3 frases: o que aconteceu, tom geral, resultado principal]

## Decisões tomadas
1. [Decisão + quem decidiu]
2. [...]

## Compromissos assumidos

### HaruCode deve:
1. [Ação] — Responsável: [nome] — Prazo: [data ou "a definir"]
2. [...]

### Cliente/prospect deve:
1. [Ação] — Prazo esperado: [data ou "a definir"]
2. [...]

## Informações novas relevantes
[Dados que surgiram na reunião e que atualizam o contexto: dor revelada, budget mencionado, timeline, stakeholders, objeções, concorrência]

## Próxima interação
[O que ficou combinado como próximo passo e quando]

## Notas internas (não compartilhar com cliente)
[Impressões, riscos detectados, oportunidades de upsell, sinais de compra/alerta]
```

### 4. Ações automáticas

Após gerar o registro:

1. **Salvar** em `Clientes/[nome]/reunioes/YYYY-MM-DD.md` (cliente ativo) ou `Prospeccao/[vertical]/[empresa]-reuniao-YYYY-MM-DD.md` (prospect)
2. **Atualizar pipeline-index.md** se houver mudança de status do prospect/cliente
3. **Gerar rascunho de mensagem pós-reunião** (template 7 do templates-whatsapp.md) — AMARELO, Ian aprova antes
4. **Criar itens de follow-up** se houver compromissos com prazo — salvar em `Follow-Up/`
5. **Sugerir atualização** de empresa-status.md se informação relevante surgiu (novo projeto, mudança de escopo, etc.)

---

## Integração com outros fluxos

| Fluxo | Relação |
|-------|---------|
| prep-reuniao | Antes da reunião — briefing. Pós-reunião compara planejado vs. executado |
| follow-up-comercial | Depois — tracking dos compromissos assumidos |
| status-semanal | Reuniões da semana alimentam o relatório semanal |
| proposta-comercial | Se a reunião gerou pedido de proposta, acionar esse fluxo |
| brain-dump-parser | Se as notas vierem como áudio transcrito, processar primeiro |

---

## Regras

- Registro é VERDE (Cowork faz sozinho) — captura de informação não requer aprovação
- Mensagem pós-reunião é AMARELO — sempre rascunho, Ian aprova
- Se a reunião envolveu decisão sobre valores, prazos ou compromissos → destacar com **negrito** e verificar se Ian confirma antes de registrar como fato
- Se Ian não fornecer informações suficientes, pedir o mínimo necessário (decisões + próximos passos) — não bloquear por falta de detalhes secundários
