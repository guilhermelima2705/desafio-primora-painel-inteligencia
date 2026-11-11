import { dataOriginal, registro } from './validacao.js';

export class RegistroSaude {
  #data;
  #score;

  constructor(dados) {
    registro(dados, 'RegistroSaude');
    this.#data = dataOriginal(dados.data);
    if (!Number.isFinite(dados.score) || dados.score < 0 || dados.score > 100) {
      throw new TypeError('score deve ser um número entre 0 e 100.');
    }
    this.#score = dados.score;
    Object.freeze(this);
  }

  get data() { return this.#data; }
  get score() { return this.#score; }
}
