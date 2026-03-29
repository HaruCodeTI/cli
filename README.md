# @harucode.ti/cli

CLI de contexto da HaruCode — docs, sync, status e skills da empresa.

## Instalacao

```bash
npx @harucode.ti/cli@latest init
```

## Como funciona

A CLI distribui documentos de contexto e skills do Claude Code para a equipe da HaruCode.

- **Docs estruturais** (brand, voz, visual) vem embutidos no pacote
- **Docs volateis** (status, clientes, pipeline) sao sincronizados de um repo privado no GitHub
- **Skills** do Claude Code sao instaladas globalmente ou por projeto

![Arquitetura](docs/images/architecture.png)

## Comandos

| Comando | Descricao |
|---|---|
| `harucode init` | Setup inicial — configura perfil e baixa docs |
| `harucode context` | Ver docs de contexto da empresa |
| `harucode context <id>` | Ler doc especifico |
| `harucode sync` | Atualizar docs volateis do GitHub |
| `harucode status` | Status da empresa (time, projetos, financeiro) |
| `harucode whoami` | Seu perfil e configuracao |
| `harucode skills` | Gerenciar skills do Claude Code |
| `harucode skills install <id>` | Instalar skill especifica |
| `harucode skills install --cat <cat>` | Instalar todas de uma categoria |
| `harucode skills update` | Atualizar skills com versao nova |

## Onboarding

![Fluxo de Onboarding](docs/images/flow-onboarding.png)

## Skills

13 skills organizadas em 3 categorias:

**Produtividade** — brain-dump-parser, briefing-matinal, status-semanal, review-semanal, pos-reuniao

**Comercial** (socio) — pesquisa-prospect, prep-reuniao, proposta-comercial, follow-up-comercial

**Conteudo** — conteudo-instagram, conteudo-linkedin, conteudo-blog, calendario-editorial

![Fluxo de Skills](docs/images/flow-skills.png)

## Flags

### context

- `--copy` — copia pro clipboard
- `--path` — mostra caminho do arquivo
- `--raw` — markdown puro
- `--cat <cat>` — filtra por categoria

### skills

- `--list` — lista skills sem menu interativo
- `--status` — mostra so as instaladas
- `install --cat <cat>` — instala todas de uma categoria

## Requisitos

- Node.js >= 18
- GitHub Personal Access Token (para docs volateis)
