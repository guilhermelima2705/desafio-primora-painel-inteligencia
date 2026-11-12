import { dataOriginal, registro, texto } from './validacao.js';

export class Evento {
  #data;
  #tipo;
  #titulo;
  #valor;

  constructor(dados) {
    registro(dados, 'Evento');
    this.#data = dataOriginal(dados.data, true);
    this.#tipo = texto(dados.tipo, 'tipo');
    this.#titulo = texto(dados.titulo, 'titulo');
    if (dados.valor !== undefined && !Number.isFinite(dados.valor)) {
      throw new TypeError('valor deve ser um número finito quando informado.');
    }
    this.#valor = dados.valor;
    Object.freeze(this);
  }

  get data() { return this.#data; }
  get tipo() { return this.#tipo; }
  get titulo() { return this.#titulo; }
  get valor() { return this.#valor; }
}
