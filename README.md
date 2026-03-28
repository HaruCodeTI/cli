# @harucode.ti/cli

CLI de contexto da HaruCode — docs, sync e status da empresa.

## Instalação

```bash
npx @harucode.ti/cli init
```

## Comandos

| Comando | Descrição |
|---|---|
| `harucode init` | Setup inicial |
| `harucode context` | Ver docs de contexto |
| `harucode context <id>` | Ler doc específico |
| `harucode sync` | Atualizar docs voláteis |
| `harucode status` | Status da empresa |
| `harucode whoami` | Seu perfil |

## Flags do context

- `--copy` — copia pro clipboard
- `--path` — mostra caminho do arquivo
- `--raw` — markdown puro
- `--cat <cat>` — filtra por categoria

## Requisitos

- Node.js >= 18
- GitHub Personal Access Token (para docs voláteis)
