---
name: conteudo-linkedin
description: >
  Gerar posts de LinkedIn para os fundadores da HaruCode.
  Ativar quando Ian mencionar LinkedIn, post, publicação,
  ou pedir conteúdo para redes sociais profissionais.
version: 1.0.0
category: conteudo
access:
  - socio
  - funcionario
---

# Geração de Post LinkedIn — HaruCode

## Propósito do canal
LinkedIn é canal de **validação**. O prospect já ouviu falar da HaruCode (indicação, WhatsApp, reunião) e vem conferir. Não precisa ser convencido — precisa ser confirmado. "Esse cara sabe do que tá falando." Em Campo Grande, LinkedIn tem penetração menor que Instagram entre decisores (administradoras, imobiliárias). Valor principal: credencial de prova social.

## Regra principal
Posts são pessoais (Ian, Guilherme ou Arthur), não da página institucional.
Tom: especialistas que mostram o trabalho, não empresa corporativa.

## Estratégia ativa (fase lean)
- Começar alternando com Instagram (1 post a cada 2 semanas). Escalar pra semanal quando cadência de conteúdo estabilizar.
- Ian como principal. Arthur quando tiver conteúdo técnico relevante — não forçar cadência
- Revisitar frequência após 8 semanas com dados reais

## 4 tipos de post (em ordem de prioridade)

### Tipo 1: Processo / raciocínio (PRIORITÁRIO)
- Mostrar como a HaruCode pensa e trabalha. Não precisa de case — precisa de profundidade.
- Exemplo de estrutura:
  "Antes de escrever uma linha de código, a gente [processo].
  Por quê? Porque [raciocínio].
  Na prática isso evita [problema comum].
  Se você contrata dev e não faz isso: [consequência]."
- Temas: como estruturamos uma proposta, por que recusamos escopo indefinido, como escolhemos stack, como preparamos uma reunião com prospect
- Tom: consultivo, mostra competência pelo raciocínio
- Frequência: maioria dos posts — é o formato mais sustentável sem depender de cases

### Tipo 2: Ferramenta / stack (ensinar algo útil)
- Compartilhar algo que a HaruCode usa e que outros podem aplicar
- Exemplo de estrutura:
  "Descobri que [ferramenta/processo] resolve [problema comum].
  Como funciona: [3-4 passos].
  O resultado pra gente: [impacto].
  Testa e me conta."
- Tom: generoso, prático, sem vender
- Frequência: intercalar quando natural
- ATENÇÃO: não revelar IA como vantagem interna (brand-foundation §9)

### Tipo 3: Resultado concreto (QUANDO TIVER CASE)
- Antes/depois com dado real e autorização do cliente. Formato premium.
- Exemplo de estrutura:
  "[Cliente/situação] tinha [problema com dado].
  A gente [o que fizeram em 1 frase].
  Resultado: [número ou comparação concreta].
  O que fez a diferença: [insight]."
- Tom: factual, deixar o resultado falar
- Frequência: quando existir case publicável — não fabricar

### Tipo 4: Behind the scenes (bastidores) — SECUNDÁRIO
- Mostrar processo real, incluindo dificuldades e aprendizados
- Exemplo de estrutura:
  "Essa semana [situação real].
  O que aconteceu: [contexto honesto].
  O que aprendemos: [insight prático].
  Se você passa por algo parecido: [dica ou reflexão]."
- Tom: vulnerável e honesto, sem drama artificial
- Frequência: máximo 1 em cada 4-5 posts (voice-and-style.md §1)

## Regras de formato
- Máximo 1.300 caracteres
- Parágrafos de 1-2 linhas (LinkedIn mobile precisa de respiro)
- Hook forte na primeira linha — gerar curiosidade ou provocação
- CTA leve no final (pergunta, convite pra comentar, não "agende uma call")
- Hashtags: máximo 3, específicas (#IAComercial #AutomacaoWhatsApp #StartupBR)
- Se derivado de artigo do blog: adaptar o insight principal, não resumir o artigo

## Visual (quando incluir imagem)
- Seguir visual-system.md
- LinkedIn: prefere fundos claros (#FAFAFA)
- Dados/métricas em destaque com roxo (#8C52FF)
- Print de tela ou foto real > arte genérica

## Copy principles aplicáveis (voice-and-style.md §3)
- Especificidade: dado concreto quando existir, processo concreto quando não existir. Especificidade vem da descrição, não só de número.
- Prova social por proximidade: citar Campo Grande, segmento local, contexto regional
- 1 CTA leve: pergunta ou convite pra comentar — não "agende uma call"
- Tom consultivo: "como resolvemos" > "compre nosso serviço"
- Sem urgência fabricada

## Derivação entre canais
1 tema gera conteúdo pra Instagram E LinkedIn com ângulos diferentes:
- **LinkedIn:** foco no raciocínio/processo (linguagem técnica-consultiva, "como resolvemos...")
- **Instagram:** foco na dor do prospect (linguagem emocional, "você perde lead quando...")
Checar calendario-editorial.md pra manter os canais sincronizados.

## Integração com TASKS.md
- Ao gerar post, atualizar seção "Conteúdo da Semana" do TASKS.md (status, tipo, tema)
- Checar calendario-editorial.md por tema planejado antes de sugerir tema novo

## Integração com plugins
Plugin Marketing (draft-content, content-creation) pode gerar rascunhos. Esta skill fornece o contexto HaruCode (tipos de post, prioridades, tom específico) que o CLAUDE.md injeta antes do plugin executar.

## Output
- Salvar em Conteudo/LinkedIn/YYYY-MM-DD-tema.md
- Incluir: tipo do post, autor sugerido (Ian/Guilherme/Arthur), rascunho completo
- Marcar como RASCUNHO
