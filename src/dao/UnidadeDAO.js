import dataset from '../data/dataset_painel_multitenant.json' with { type: 'json' };
import { Unidade } from '../models/Unidade.js';
import { texto } from '../models/validacao.js';

export class UnidadeDAO {
  async listar() {
    return dataset.tenants.map(dados => new Unidade(dados));
  }

  async buscarPorId(id) {
    texto(id, 'id');
    const dados = dataset.tenants.find(item => item.id === id);
    return dados ? new Unidade(dados) : null;
  }
}
