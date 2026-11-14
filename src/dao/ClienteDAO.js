import { buscarLista } from '../api/http.js';
import { Cliente } from '../models/Cliente.js';
import { texto } from '../models/validacao.js';

export class ClienteDAO {
  #opcoes;

  constructor(opcoes) {
    this.#opcoes = opcoes;
  }

  async carregar() {
    const { itens, geradoEm } = await buscarLista('/clientes', this.#opcoes);
    return { itens: itens.map(dados => new Cliente(dados)), geradoEm };
  }

  async listar() {
    return (await this.carregar()).itens;
  }

  async buscarPorId(id) {
    texto(id, 'id');
    return (await this.listar()).find(item => item.id === id) ?? null;
  }

  async listarPorUnidade(tenantId) {
    texto(tenantId, 'tenantId');
    return (await this.listar()).filter(item => item.tenantId === tenantId);
  }
}
