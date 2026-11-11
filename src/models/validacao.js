export function registro(valor, campo) {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) {
    throw new TypeError(`${campo} deve ser um objeto.`);
  }
}

export function texto(valor, campo) {
  if (typeof valor !== 'string' || !valor.trim()) {
    throw new TypeError(`${campo} deve ser um texto não vazio.`);
  }
  return valor;
}

export function numero(valor, campo, inteiro = false) {
  if (!Number.isFinite(valor) || valor < 0 || (inteiro && !Number.isInteger(valor))) {
    throw new TypeError(`${campo} deve ser um número ${inteiro ? 'inteiro ' : ''}não negativo.`);
  }
  return valor;
}

export function lista(valor, campo) {
  if (!Array.isArray(valor)) throw new TypeError(`${campo} deve ser um array.`);
  return Array.from(valor);
}

export function contagens(valor, campo, chaves) {
  registro(valor, campo);
  return Object.fromEntries(chaves.map(chave => [chave, numero(valor[chave], `${campo}.${chave}`, true)]));
}

export function dataOriginal(valor, comHorario = false) {
  const formato = comHorario
    ? /^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/
    : /^\d{4}-\d{2}-\d{2}$/;
  if (typeof valor !== 'string' || !formato.test(valor) || valor !== valor.trim()) {
    throw new TypeError('Formato de data inválido.');
  }
  const [ano, mes, dia] = valor.slice(0, 10).split('-').map(Number);
  const bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
  const dias = [31, bissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (mes < 1 || mes > 12 || dia < 1 || dia > dias[mes - 1]) {
    throw new TypeError('Data inexistente.');
  }
  return valor;
}
