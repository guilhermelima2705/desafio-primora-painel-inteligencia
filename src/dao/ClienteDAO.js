import dataset from '../data/dataset_painel_multitenant.json' with { type: 'json' };
import { Cliente } from '../models/Cliente.js';
import { texto } from '../models/validacao.js';

export class ClienteDAO {
  async listar() {
    return dataset.clientes.map(dados => new Cliente(dados));
  }

  async buscarPorId(id) {
    texto(id, 'id');
    const dados = dataset.clientes.find(item => item.id === id);
    return dados ? new Cliente(dados) : null;
  }

  async listarPorUnidade(tenantId) {
    texto(tenantId, 'tenantId');
    return dataset.clientes.filter(item => item.tenantId === tenantId)
      .map(dados => new Cliente(dados));
  }
}
