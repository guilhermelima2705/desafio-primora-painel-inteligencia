export async function buscarLista(caminho, {
  signal,
  baseUrl = import.meta.env?.VITE_API_BASE_URL,
} = {}) {
  const base = baseUrl?.trim().replace(/\/+$/, '');
  if (!base) throw new Error('Configure VITE_API_BASE_URL para acessar a API.');

  let resposta;
  try {
    resposta = await fetch(`${base}${caminho}`, { signal });
  } catch (erro) {
    signal?.throwIfAborted();
    throw new Error('Não foi possível conectar à API.', { cause: erro });
  }
  if (!resposta.ok) throw new Error(`A API respondeu com HTTP ${resposta.status}.`);

  let itens;
  try {
    itens = await resposta.json();
  } catch (erro) {
    signal?.throwIfAborted();
    throw new Error('A API retornou um JSON inválido.', { cause: erro });
  }
  if (!Array.isArray(itens)) throw new Error('A API retornou um formato inesperado.');

  return { itens, geradoEm: resposta.headers.get('X-Dataset-Gerado-Em') };
}
