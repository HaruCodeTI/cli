---
name: brain-dump-parser
description: >
  Processa textos desestruturados (transcrições de áudio, notas brutas, mensagens longas
  sem formatação) e transforma em informação estruturada e acionável. Ative quando o input
  parecer texto oral transcrito — indicadores: linguagem informal, marcadores como "sabe?",
  "né?", "tipo", autocorreções ("não, na verdade"), repetições, frases incompletas, mudanças
  abruptas de tópico, ou blocos longos sem formatação. Também ative se o usuário disser
  "processa isso", "brain dump", "organiza esse texto", ou colar bloco grande de texto sem
  estrutura que parece fala. Versão genérica — funciona para qualquer pessoa, não customizada
  para um perfil específico.
version: 1.0.0
category: produtividade
access:
  - socio
  - funcionario
---

# Brain Dump Parser — Processador de Textos Desestruturados

## Propósito

Transforma textos brutos e desestruturados (transcrições de áudio, notas soltas, mensagens longas) em informação organizada e acionável. Versão genérica que funciona para qualquer input desestruturado.

---

## Detecção Automática

Ativar quando o input apresentar **3 ou mais** destes indicadores:

- Repetições de sílabas/palavras
- Autocorreções: "X não, Y" ou "não, na verdade Z"
- Frases abandonadas no meio
- Marcadores de confirmação oral em alta frequência: "sabe?", "né?", "entendeu?"
- Ausência de pontuação/estrutura formal em bloco >300 palavras
- Mudanças de tópico sem conectivo lógico

---

## Pipeline de Processamento

### ETAPA 1 — Limpeza

1. **Descartar ruído oral** — "sabe?", "né?", "entendeu?" (quase nunca têm conteúdo semântico). Manter "na verdade" (sinaliza autocorreção)
2. **Resolver autocorreções** — manter segunda versão, descartar primeira
3. **Colapsar repetições** — "eu eu acho" → "eu acho"
4. **Separar contexto de instrução** — identificar onde termina justificativa/contexto e começa o pedido

### ETAPA 2 — Extração de Estrutura

Identificar:

1. **Tema central** — sobre o que é o texto
2. **Intenção real** — o que a pessoa quer que aconteça
3. **Pontos de ação** — tarefas ou compromissos mencionados
4. **Informações relevantes** — dados, nomes, datas, restrições

### ETAPA 3 — Classificação

| Tipo | Indicadores | Output esperado |
|------|-------------|-----------------|
| **Briefing** | Muito contexto, pouca ação | Resumo + perguntas |
| **Pedido** | "Queria que", "faz X", "preciso de" | Confirmar + executar |
| **Reflexão/Ideia** | "Estou pensando em", comparações | Estruturar + apontar lacunas |
| **Decisão** | Opções comparadas, prós/contras | Estruturar opções + trade-offs |
| **Relato** | Passado narrativo, "aconteceu que" | Extrair fatos, decisões, próximos passos |

### ETAPA 4 — Detecção de Lacunas

- **Ambiguidades**: duas interpretações igualmente plausíveis
- **Referências vagas**: sem antecedente claro
- **Informação ausente**: dados necessários não mencionados

**Regra de decisão:**
- Tarefa simples + ambiguidade menor → assumir e marcar com [ASSUMIDO: ...]
- Tarefa complexa + ambiguidade significativa → perguntar (cirurgicamente: "quis dizer A ou B?")

---

## Formato de Output

### Para textos curtos (<200 palavras, pedido claro):

```
Entendi que você quer [X]. Vou fazer [Y]. Certo?
```

### Para textos médios/longos:

```
## Texto Processado

**Tipo**: [classificação]
**Tema**: [uma frase]

---

### Conteúdo organizado
[Reescrever em prosa clara. Organizar por subtema se necessário.
Eliminar ruído mas preservar 100% da informação.]

### Intenção extraída
[O que a pessoa quer que aconteça.]

### Pontos de ação
[Tarefas/próximos passos identificados. Omitir se nenhum.]

### Lacunas
[Perguntas se houver ambiguidade crítica. Omitir se nenhuma.]

### Suposições
[O que foi assumido. Formato: "[ASSUMIDO: X] — Porque Y". Omitir se nenhuma.]
```

---

## Notas

- Esta é uma versão genérica — não customizada para padrões de fala de uma pessoa específica
- Thresholds de autonomia seguem working-rules.md §1 (verde/amarelo/vermelho)
- O output processado é checkpoint de confirmação — após aprovação, prosseguir com a execução
