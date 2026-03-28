// src/github/fetcher.js
import { GITHUB_RAW_BASE } from '../config.js';

export function buildRawUrl(path) {
  return `${GITHUB_RAW_BASE}/${path}`;
}

export function parseGitHubError(status) {
  switch (status) {
    case 401:
      return 'Token inválido ou expirado. Gere um novo token.';
    case 403:
      return 'Sem permissão. Verifique se o token tem o scope "repo".';
    case 404:
      return 'Arquivo não encontrado no repositório.';
    default:
      return `Erro inesperado do GitHub (HTTP ${status}).`;
  }
}

export async function fetchFile(path, token) {
  const url = buildRawUrl(path);
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error(parseGitHubError(response.status));
  }

  return response.text();
}

export async function fetchDir(dirPath, token) {
  // GitHub Contents API para listar diretório
  const apiUrl = `https://api.github.com/repos/HaruCode/context/contents/${dirPath}?ref=main`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(parseGitHubError(response.status));
  }

  const items = await response.json();
  const files = items.filter(i => i.type === 'file' && i.name.endsWith('.md'));

  const results = [];
  for (const file of files) {
    const content = await fetchFile(`${dirPath}/${file.name}`, token);
    results.push({ name: file.name, path: `${dirPath}/${file.name}`, content });
  }

  return results;
}
