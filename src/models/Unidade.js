import { contagens, lista, numero, registro, texto } from './validacao.js';

export class Unidade {
  #id;
  #nome;
  #porte;
  #carteiraTotalClientes;
  #receitaCarteira90d;
  #engagementEvents7d;
  #activeUsers7d;
  #riscoAbsoluto;
  #engagementTrend30d;
  #funnel90d;
  #funnelTrend30d;
  #healthDistribution;
  #riscoDrivers;

  constructor(dados) {
    registro(dados, 'Unidade');
    this.#id = texto(dados.id, 'id');
    this.#nome = texto(dados.nome, 'nome');
    this.#porte = texto(dados.porte, 'porte');
    this.#carteiraTotalClientes = numero(dados.carteiraTotalClientes, 'carteiraTotalClientes', true);
    this.#receitaCarteira90d = numero(dados.receitaCarteira90d, 'receitaCarteira90d');
    this.#engagementEvents7d = numero(dados.engagementEvents7d, 'engagementEvents7d', true);
    this.#activeUsers7d = numero(dados.activeUsers7d, 'activeUsers7d', true);
    this.#riscoAbsoluto = numero(dados.riscoAbsoluto, 'riscoAbsoluto', true);
    this.#engagementTrend30d = lista(dados.engagementTrend30d, 'engagementTrend30d').map(valor => numero(valor, 'engagementTrend30d', true));
    this.#funnel90d = contagens(dados.funnel90d, 'funnel90d', ['gerada', 'vista', 'sucesso', 'falha']);
    this.#funnelTrend30d = lista(dados.funnelTrend30d, 'funnelTrend30d').map(valor => numero(valor, 'funnelTrend30d'));
    this.#healthDistribution = contagens(dados.healthDistribution, 'healthDistribution', ['saudavel', 'atencao', 'risco', 'critico']);
    this.#riscoDrivers = lista(dados.riscoDrivers, 'riscoDrivers').map(valor => texto(valor, 'riscoDrivers'));
    Object.freeze(this);
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get porte() { return this.#porte; }
  get carteiraTotalClientes() { return this.#carteiraTotalClientes; }
  get receitaCarteira90d() { return this.#receitaCarteira90d; }
  get engagementEvents7d() { return this.#engagementEvents7d; }
  get activeUsers7d() { return this.#activeUsers7d; }
  get riscoAbsoluto() { return this.#riscoAbsoluto; }
  get engagementTrend30d() { return [...this.#engagementTrend30d]; }
  get funnel90d() { return { ...this.#funnel90d }; }
  get funnelTrend30d() { return [...this.#funnelTrend30d]; }
  get healthDistribution() { return { ...this.#healthDistribution }; }
  get riscoDrivers() { return [...this.#riscoDrivers]; }
}
