# Sistema Visual HaruCode

**Versão:** 1.0
**Data:** Março 2026
**Status:** Referência oficial

---

## 1. Paleta de Cores

A paleta da HaruCode é construída sobre o contraste forte entre preto profundo e branco puro, com o roxo como único elemento cromático. Essa escolha reforça os pilares de identidade: precisão técnica, sofisticação e inovação sem excessos.

### Tabela de Cores

| Nome | HEX | RGB | Papel na Hierarquia | Quando Usar | Quando NÃO Usar |
|---|---|---|---|---|---|
| **Roxo Primário** | `#8C52FF` | rgb(140, 82, 255) | Cor de marca, ação e destaque principal | CTAs, links, elementos interativos, ícones destacados, bordas de foco, badges | Como cor de fundo em grandes áreas; nunca para texto corrido sobre branco em tamanho pequeno |
| **Preto Profundo** | `#0A0A0A` | rgb(10, 10, 10) | Base de fundos escuros e texto principal | Fundos dark mode, texto primário em fundos claros, headers de seção | Como fundo em layouts que exigem leveza; evitar em excesso em peças impressas de baixo custo |
| **Branco Suave** | `#FAFAFA` | rgb(250, 250, 250) | Base de fundos claros e texto em fundos escuros | Fundos light mode, texto sobre fundos escuros, espaços de respiro | Sobre o Roxo Primário sem verificação de contraste; nunca como elemento de destaque isolado |
| **Cinza Médio** | `#3D3D3D` | rgb(61, 61, 61) | Texto secundário e elementos de suporte | Subtítulos, labels, descrições secundárias, bordas sutis | Como cor de fundo principal; não usar para texto muito pequeno (abaixo de 12px) sobre fundos escuros |
| **Cinza Claro** | `#8A8A8A` | rgb(138, 138, 138) | Texto terciário, placeholders e metadados | Captions, texto de input placeholder, metadados, timestamps, divisores | Para qualquer texto que precise de alta legibilidade; nunca em texto funcional crítico (erros, avisos) |
| **Roxo Escuro** | `#5A2DB8` | rgb(90, 45, 184) | Variante de profundidade e estado pressed | Hover de botões primários, sombras coloridas, estado ativo de elementos | Como cor principal de destaque (papel reservado ao Roxo Primário); evitar isolado sem o roxo primário |
| **Roxo Claro** | `#B98AFF` | rgb(185, 138, 255) | Variante de leveza, tints e estados disabled | Backgrounds de badge em dark mode, tints de elementos primários, texto roxo sobre fundos escuros | Sobre fundos claros sem verificação de contraste; nunca como substituto do Roxo Primário em ações |

### Notas sobre a Paleta

- A paleta não possui cor de acento adicional. Isso é intencional. Qualquer adição cromática quebra o sistema.
- Gradientes devem ser evitados. Se necessário em casos excepcionais, usar apenas entre `#8C52FF` e `#5A2DB8`, sem transparências complexas.
- Nunca usar cores fora desta paleta em materiais oficiais de marca.

---

## 2. Tipografia

A tipografia da HaruCode é dual: **Space Grotesk** carrega a personalidade da marca em momentos de impacto; **Inter** garante máxima legibilidade em contextos funcionais e de leitura.

**Fonte de obtenção:** Adobe Fonts (adobe.com/fonts) — ambas disponíveis para uso em web e desktop mediante licença Adobe Creative Cloud.

---

### Space Grotesk — Tipografia de Display e Títulos

Geométrica, com detalhes técnicos únicos nos caracteres. Transmite inovação e personalidade sem abrir mão da clareza.

**Pesos utilizados:**

| Peso | Nome | Uso Principal |
|---|---|---|
| 300 | Light | Títulos grandes com contraste de peso (uso pontual) |
| 400 | Regular | Subtítulos e textos de apoio em display |
| 500 | Medium | Headlines de seção e títulos de card |
| 600 | SemiBold | Títulos principais de página e seção |
| 700 | Bold | Headlines de impacto, H1 e H2 em peças de marketing |

**Pesos não utilizados:** 100, 200 — muito leves para o posicionamento premium da marca.

**Tamanhos recomendados por tipo de conteúdo:**

| Conteúdo | Tamanho | Peso | Line-height |
|---|---|---|---|
| Headline principal (hero) | 56–72px | Bold (700) | 1.1 |
| Headline de seção | 36–48px | SemiBold (600) | 1.15 |
| Título de card/módulo | 24–32px | Medium (500) | 1.2 |
| Subtítulo de apoio | 18–22px | Regular (400) | 1.3 |
| Tag / Label display | 12–14px | Medium (500) | 1.4 |

---

### Inter — Tipografia de Corpo e UI

Humanista, projetada para interfaces digitais. Alta legibilidade em qualquer tamanho e densidade de texto.

**Pesos utilizados:**

| Peso | Nome | Uso Principal |
|---|---|---|
| 400 | Regular | Corpo de texto, parágrafos, descrições |
| 500 | Medium | Labels de UI, itens de navegação, texto de botão |
| 600 | SemiBold | Destaques inline, texto de botão primário, forte ênfase |
| 700 | Bold | Uso pontual em dados e métricas (números de destaque) |

**Pesos não utilizados:** 100, 200, 300 — prejudicam legibilidade em telas; 800, 900 — reserva exclusiva para Space Grotesk em momentos de impacto.

**Tamanhos recomendados por tipo de conteúdo:**

| Conteúdo | Tamanho | Peso | Line-height |
|---|---|---|---|
| Corpo de texto longo | 16–18px | Regular (400) | 1.6 |
| Corpo de texto compacto | 14–16px | Regular (400) | 1.5 |
| Labels e navegação | 14px | Medium (500) | 1.4 |
| Texto de botão | 14–16px | SemiBold (600) | 1 |
| Caption / Metadado | 12–13px | Regular (400) | 1.4 |
| Input e formulário | 14–16px | Regular (400) | 1.5 |

---

### Hierarquia Tipográfica Completa

| Nível | Fonte | Tamanho | Peso | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|---|
| H1 | Space Grotesk | 56px | Bold (700) | 1.1 | -0.02em | Hero headline, título principal de página |
| H2 | Space Grotesk | 40px | SemiBold (600) | 1.15 | -0.01em | Títulos de seção principais |
| H3 | Space Grotesk | 32px | SemiBold (600) | 1.2 | -0.01em | Subtítulos de seção, títulos de bloco |
| H4 | Space Grotesk | 24px | Medium (500) | 1.25 | 0 | Títulos de card, módulo, coluna |
| H5 | Inter | 18px | SemiBold (600) | 1.3 | 0 | Títulos de sub-seção, labels de grupo |
| H6 | Inter | 16px | SemiBold (600) | 1.35 | 0.01em | Labels de campo, títulos menores |
| Corpo | Inter | 16px | Regular (400) | 1.6 | 0 | Parágrafos, descrições, conteúdo editorial |
| Corpo Compacto | Inter | 14px | Regular (400) | 1.5 | 0 | Textos de suporte, tooltips, UI densa |
| Caption | Inter | 12px | Regular (400) | 1.4 | 0.01em | Legendas, timestamps, metadados |

---

## 3. Regras de Uso Visual

### Combinações de Cor Aprovadas

| Contexto | Fundo | Texto Principal | Destaque / Ação |
|---|---|---|---|
| Dark mode principal | `#0A0A0A` | `#FAFAFA` | `#8C52FF` |
| Dark mode com profundidade | `#3D3D3D` | `#FAFAFA` | `#B98AFF` |
| Light mode principal | `#FAFAFA` | `#0A0A0A` | `#8C52FF` |
| Light mode texto secundário | `#FAFAFA` | `#3D3D3D` | `#8C52FF` |
| Botão primário | `#8C52FF` | `#FAFAFA` | — |
| Botão primário (hover) | `#5A2DB8` | `#FAFAFA` | — |
| Badge / Tag em dark | `#3D3D3D` | `#B98AFF` | — |
| Card com borda destaque | `#0A0A0A` | `#FAFAFA` | Borda `#8C52FF` |

### Combinações Proibidas

| Combinação | Motivo |
|---|---|
| `#8A8A8A` sobre `#FAFAFA` (texto pequeno) | Contraste insuficiente — falha WCAG AA |
| `#B98AFF` sobre `#FAFAFA` | Contraste insuficiente — falha WCAG AA |
| `#8C52FF` sobre `#0A0A0A` (texto pequeno) | Contraste abaixo do limiar para texto abaixo de 18px |
| Qualquer cor fora da paleta oficial | Quebra coerência visual da marca |
| Múltiplas cores de destaque na mesma peça | Fragmenta hierarquia e dilui o roxo como assinatura |
| Gradientes arco-íris ou multicoloridos | Incompatível com posicionamento premium e técnico |

### Contraste Mínimo — WCAG AA

O sistema visual da HaruCode segue as diretrizes WCAG 2.1 Nível AA como padrão mínimo de acessibilidade.

| Contexto | Relação de Contraste Mínima |
|---|---|
| Texto normal (abaixo de 18px regular / 14px bold) | 4.5:1 |
| Texto grande (18px+ regular / 14px+ bold) | 3:1 |
| Componentes de UI e bordas funcionais | 3:1 |

**Verificações de contraste das combinações principais:**

| Combinação | Contraste Estimado | Status AA |
|---|---|---|
| `#FAFAFA` sobre `#0A0A0A` | ~20:1 | Aprovado |
| `#0A0A0A` sobre `#FAFAFA` | ~20:1 | Aprovado |
| `#8C52FF` sobre `#0A0A0A` | ~5.8:1 | Aprovado |
| `#FAFAFA` sobre `#8C52FF` | ~5.8:1 | Aprovado |
| `#B98AFF` sobre `#0A0A0A` | ~8.2:1 | Aprovado |
| `#3D3D3D` sobre `#FAFAFA` | ~9.6:1 | Aprovado |
| `#8A8A8A` sobre `#FAFAFA` | ~3.5:1 | Aprovado apenas para texto grande |

### Espaçamento e Grid

Todo o sistema de espaçamento é baseado em múltiplos de **8px**. Isso garante consistência entre plataformas e facilita a implementação técnica.

**Escala de espaçamento:**

| Token | Valor | Uso Típico |
|---|---|---|
| space-1 | 4px | Espaçamento mínimo interno (padding de badge, gap inline) |
| space-2 | 8px | Espaçamento padrão entre elementos relacionados |
| space-3 | 16px | Padding interno de cards e botões, gap entre itens de lista |
| space-4 | 24px | Separação entre grupos de conteúdo |
| space-5 | 32px | Espaçamento entre seções menores |
| space-6 | 48px | Espaçamento entre seções principais |
| space-7 | 64px | Padding de seções em desktop |
| space-8 | 96px | Espaçamento entre blocos de página (hero, features) |
| space-9 | 128px | Espaçamento máximo entre seções âncora |

**Grid:**

- Desktop: 12 colunas, gutter de 24px, margin lateral de 80px
- Tablet: 8 colunas, gutter de 16px, margin lateral de 40px
- Mobile: 4 colunas, gutter de 16px, margin lateral de 24px
- Largura máxima de conteúdo: 1280px

---

## 4. Estilo de Imagens e Fotografias

### Diretrizes para Fotos

**Estilo e tratamento:**

- Preferir imagens com fundo escuro ou neutro, alinhadas ao estilo dark da marca
- Fotos devem ter tratamento de cores frio/dessaturado — evitar tons quentes, amarelados ou laranjas
- Imagens de interface, código ou tecnologia devem ter aspecto limpo e contemporâneo
- Iluminação preferencial: artificial, direcional, com sombras controladas (estúdio ou ambiente tech)
- Pessoas: postura natural e confiante, não forçada; diversidade é mandatória

**Temas adequados:**

- Ambientes de trabalho tech (escritórios clean, espaços de coworking modernos)
- Interfaces e telas de computador com uso real de produto
- Detalhes de hardware e equipamentos tecnológicos
- Equipes em colaboração em contexto profissional
- Elementos abstratos de código, dados ou redes (usados com parcimônia)

**Sobreposição de elementos de marca:**

- Quando necessário sobrepor texto ou elementos gráficos, aplicar um overlay em `#0A0A0A` com opacidade entre 40% e 70%
- Nunca sobrepor elementos de marca diretamente sobre áreas de alta complexidade visual

### O que Evitar em Imagens

- Fotos de banco com aspecto genérico ou artificialmente feliz (aperto de mão exagerado, sorrisos forçados)
- Imagens com paleta de cores divergente (tons terrosos, alaranjados, vermelhos vibrantes)
- Fotos com baixa qualidade ou resolução insuficiente para o canal de destino
- Imagens conceituais com globos, engrenagens ou lâmpadas — clichês de tecnologia
- Fotos de pessoas apontando para telas ou fazendo gestos teatrais
- Composições sobrecarregadas sem espaço de respiro

---

## 5. Ícones e Elementos Gráficos

### Estilo de Ícones

**Estilo padrão:** Outline (linha)

- Espessura de linha: 1.5px para ícones em 24px; 2px para ícones em 32px ou maiores
- Cantos: levemente arredondados (border-radius consistente com a UI — 2px nos cantos de stroke)
- Terminações de linha: round caps
- Grid base: 24x24px (exportar sempre nesse grid, escalar proporcionalmente)
- Nunca misturar ícones outline com ícones filled na mesma composição

**Bibliotecas de referência compatíveis com o estilo:**
- Lucide Icons
- Phosphor Icons (estilo Regular)
- Heroicons (outline)

### Uso de Cor em Ícones

| Contexto | Cor do Ícone |
|---|---|
| Ícone neutro em fundo escuro | `#8A8A8A` ou `#FAFAFA` |
| Ícone neutro em fundo claro | `#3D3D3D` ou `#0A0A0A` |
| Ícone de destaque / ação | `#8C52FF` |
| Ícone de destaque em fundo escuro | `#B98AFF` |
| Ícone em estado desabilitado | `#8A8A8A` com opacidade 50% |

### Elementos Gráficos de Suporte

- **Linhas e divisores:** 1px, cor `#3D3D3D` em dark mode; `#3D3D3D` com 20% opacidade em light mode
- **Bordas de card:** 1px solid `#3D3D3D`; borda de destaque usa `#8C52FF`
- **Formas geométricas decorativas:** apenas formas simples (linhas, pontos, grades) em `#3D3D3D` ou `#8C52FF` com baixa opacidade; nunca formas orgânicas ou complexas
- **Background patterns:** grades ou pontos sutis são permitidos como textura de fundo, usando `#3D3D3D` com opacidade entre 5% e 15%

---

## 6. Aplicações por Canal

### Instagram

**Formato e proporções:**

| Tipo de Conteúdo | Proporção | Resolução Mínima |
|---|---|---|
| Post feed quadrado | 1:1 | 1080x1080px |
| Post feed retrato | 4:5 | 1080x1350px |
| Stories / Reels | 9:16 | 1080x1920px |
| Carrossel (slides) | 1:1 ou 4:5 | 1080x1080px |

**Uso de cor:**

- Preferir fundo `#0A0A0A` para coerência com o posicionamento premium
- Roxo Primário (`#8C52FF`) deve aparecer em pelo menos um elemento de destaque por peça
- Fundos claros (`#FAFAFA`) podem ser usados para criar variação visual no feed, mas com moderação (máximo 30% dos posts)
- Evitar fundos coloridos que não sejam da paleta oficial

**Tipografia em posts:**

- Títulos em Space Grotesk Bold, mínimo 36px no arquivo original (1080px)
- Corpo e descrições em Inter Regular, mínimo 24px no arquivo original
- Nunca usar mais de duas fontes na mesma peça
- Texto deve sempre ter contraste mínimo verificado

**Tom visual:**

- Limpo, com respiro generoso — não sobrecarregar o layout
- Um elemento de destaque por peça (CTA, número, palavra-chave)
- Consistência de estilo entre posts do mesmo mês/campanha

---

### LinkedIn

**Ajustes de tom visual:**

O LinkedIn exige uma abordagem ligeiramente mais formal e informativa. O sistema visual se mantém, mas com as seguintes adaptações:

- Preferir fundos claros (`#FAFAFA`) com mais frequência — o feed do LinkedIn tem predominância de branco e fundos dark podem parecer pesados em contexto B2B
- Hierarquia de informação mais explícita: títulos claros, subtítulos de apoio, dados e métricas em destaque
- Incluir sempre espaço para o texto da legenda no planejamento visual — no LinkedIn o texto da publicação é lido com mais atenção
- Evitar peças puramente estéticas sem conteúdo informativo — o público espera valor

**Formatos:**

| Tipo de Conteúdo | Proporção | Resolução Mínima |
|---|---|---|
| Post com imagem | 1.91:1 | 1200x628px |
| Post retrato | 4:5 | 1080x1350px |
| Artigo (imagem de capa) | 1.91:1 | 1280x720px |
| Carrossel (documento PDF) | 1:1 ou 4:3 | 1080x1080px |

**Uso de cor no LinkedIn:**

- Roxo Primário com moderação — usar como acento, não como fundo dominante em peças informativas
- Dados e métricas podem ganhar destaque em roxo para criar hierarquia
- Manter coerência visual com o Instagram, mas com densidade de informação maior

---

### Apresentações e Decks

**Regras específicas:**

**Slides de capa e transição:**

- Fundo: `#0A0A0A`
- Título principal: Space Grotesk Bold, mínimo 40pt, cor `#FAFAFA`
- Subtítulo ou tagline: Space Grotesk Regular, 24pt, cor `#8A8A8A`
- Elemento de destaque (linha, ponto, ícone): `#8C52FF`

**Slides de conteúdo:**

- Fundo: `#0A0A0A` (padrão) ou `#FAFAFA` (para slides que necessitam de alta densidade de leitura)
- Nunca alternar fundos de forma aleatória — criar seções coerentes
- Máximo de 3 elementos visuais de destaque por slide
- Títulos de slide: Space Grotesk SemiBold, 28–32pt
- Corpo: Inter Regular, 16–18pt, line-height 1.5

**Grid de apresentação:**

- Margem segura: 80px em todos os lados no formato 1920x1080px
- Alinhamento: preferir composições alinhadas à esquerda para texto (evitar centralização excessiva em slides de conteúdo)
- Espaçamento entre blocos de conteúdo: múltiplos de 16px

**Slides de dados e gráficos:**

- Usar roxo primário (`#8C52FF`) para a série de dados principal
- Séries secundárias: `#5A2DB8` e `#B98AFF`
- Eixos e gridlines: `#3D3D3D`
- Labels de dados: Inter Medium, cor `#FAFAFA` ou `#0A0A0A` conforme fundo

**Regras de transição:**

- Usar transições simples (fade, dissolve) — nunca animações chamativas ou efeitos de cubo
- Animações de entrada de conteúdo: aparecimento gradual (fade in) com timing de 200–300ms

---

*Sistema Visual HaruCode — Documento de referência interna. Revisão periódica recomendada a cada 12 meses ou em mudanças estratégicas de posicionamento.*
