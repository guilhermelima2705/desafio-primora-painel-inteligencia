import { buscarLista } from '../api/http.js';
import { Unidade } from '../models/Unidade.js';
import { texto } from '../models/validacao.js';

export class UnidadeDAO {
  #opcoes;

  constructor(opcoes) {
    this.#opcoes = opcoes;
  }

  async carregar() {
    const { itens, geradoEm } = await buscarLista('/unidades', this.#opcoes);
    return { itens: itens.map(dados => new Unidade(dados)), geradoEm };
  }

  async listar() {
    return (await this.carregar()).itens;
  }

  async buscarPorId(id) {
    texto(id, 'id');
    return (await this.listar()).find(item => item.id === id) ?? null;
  }
}
