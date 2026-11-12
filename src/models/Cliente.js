import { Evento } from './Evento.js';
import { RegistroSaude } from './RegistroSaude.js';
import { lista, registro, texto } from './validacao.js';

export class Cliente {
  #id;
  #nome;
  #tenantId;
  #tenantNome;
  #eventos;
  #healthSeries;

  constructor(dados) {
    registro(dados, 'Cliente');
    this.#id = texto(dados.id, 'id');
    this.#nome = texto(dados.nome, 'nome');
    this.#tenantId = texto(dados.tenantId, 'tenantId');
    this.#tenantNome = texto(dados.tenantNome, 'tenantNome');
    this.#eventos = lista(dados.eventos, 'eventos').map(evento => new Evento(evento));
    this.#healthSeries = lista(dados.healthSeries, 'healthSeries').map(item => new RegistroSaude(item));
    Object.freeze(this);
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get tenantId() { return this.#tenantId; }
  get tenantNome() { return this.#tenantNome; }
  get eventos() { return this.getEventos(); }
  get healthSeries() { return this.getHistoricoSaude(); }

  getEventos() { return [...this.#eventos]; }
  getHistoricoSaude() { return [...this.#healthSeries]; }
}
