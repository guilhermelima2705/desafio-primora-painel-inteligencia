# Primora — Painel de Inteligência Multi-tenant

Projeto Integrador da Primora, desenvolvido com React, Vite e Ant Design. O painel usa a API REST do Primora e mantém a seleção de unidade e cliente e o Comparativo com Recharts.

## Tecnologias

React e React DOM 19, React Router 8, Vite 8, Ant Design 6, Ant Design Icons 6 e Recharts 3. Código em JavaScript/JSX e CSS, com ESLint 10. As versões exatas instaladas são registradas no `package-lock.json`.

## Executar no Windows

Pré-requisitos: Git, Node.js compatível com Vite (`^20.19.0` ou `>=22.12.0`) e npm. O ambiente restaurado foi validado com Node.js 26.13.0 e npm 11.20.0.

```powershell
git clone https://github.com/guilhermelima2705/desafio-primora-painel-inteligencia.git
cd desafio-primora-painel-inteligencia
Copy-Item .env.example .env.local
npm.cmd ci
npm.cmd run dev
```

Em uma cópia existente, crie `.env.local` a partir de `.env.example` se ainda não houver configuração local. Inicie o backend antes do Vite.

Acesse o endereço informado pelo Vite, normalmente `http://localhost:5173`. Para encerrar, pressione `Ctrl+C`. No VS Code, abra a pasta do repositório ou execute `code .` nessa pasta.

## Páginas e interações da Sprint 4

| Página | Rota | Funcionamento |
| --- | --- | --- |
| Visão Geral | `/` | Select com as quatro unidades oficiais. A seleção atualiza o cartão de carteira, eventos de engajamento de sete dias e sucessos do funil de noventa dias, além dos gráficos de engajamento e saúde da carteira. |
| Comparativo | `/comparativo` | Tabela, ranking e gráfico de risco proporcional das quatro unidades, com as fórmulas e a ordenação existentes preservadas. A tabela tem rolagem horizontal interna. |
| Histórico de Clientes | `/historico-clientes` | Select com os três clientes oficiais. A seleção atualiza nome, identificação, unidade, quantidade de eventos, série de score de saúde e timeline em ordem da data mais recente para a mais antiga. |

Cada Select do Ant Design utiliza `useState` para guardar o ID e `onChange` para atualizar a escolha. A primeira unidade e o primeiro cliente retornados pela API são as seleções iniciais. Os registros são localizados por ID e transmitidos aos componentes por props. A troca ocorre sem recarregar a página. Ao sair e retornar à tela, a seleção volta ao valor inicial; não há persistência.

Para demonstrar: percorra as quatro unidades e confira o cartão e os gráficos; depois percorra os três clientes e confira perfil, série de saúde e eventos. As tabelas acessíveis em “Consultar…” permitem conferir os valores dos gráficos. Confira também o menu no celular e a tabela do Comparativo.

## Origem e limites dos dados

As três telas consultam a API ASP.NET Core 10 com PostgreSQL, por meio de `GET /unidades` e `GET /clientes`. O JSON acadêmico permanece como referência para os testes. A data exibida vem de `X-Dataset-Gerado-Em` e é omitida se o cabeçalho estiver indisponível. As fórmulas do Comparativo estão em `src/pages/Comparativo/README.md`.

## Configurar a API da Sprint 6

No repositório do backend, com Docker Desktop e o contêiner do PostgreSQL já configurados:

```powershell
docker compose start
. .\scripts\Set-PrimoraEnvironment.ps1
dotnet run --project src/Primora.Api --launch-profile https
```

Verifique `https://localhost:7246/health`. No frontend, use `VITE_API_BASE_URL=https://localhost:7246` em `.env.local` e reinicie o Vite após mudanças nessa variável. Use uma origem permitida pela API, como `http://localhost:5173` ou `http://127.0.0.1:5173`. O navegador precisa confiar no certificado HTTPS local.

Em um futuro deploy no Vercel, configure a URL HTTPS pública da API como `VITE_API_BASE_URL` antes do build e autorize no CORS do backend a origem exata do frontend. `localhost` aponta para a máquina do visitante. Variáveis `VITE_*` ficam visíveis no navegador.

## Validação

Execute na raiz do repositório:

```powershell
npm.cmd run lint
npm.cmd run build
node --test tests src/pages/Comparativo/indicadores.test.js
```

O build gera `dist/`. Para visualizá-lo, execute `npm.cmd run preview` e abra o endereço indicado.

O teste de navegador em `scripts/sprint4.browser.mjs` valida as quatro unidades e os três clientes, os valores exibidos, séries dos gráficos, ordem dos eventos, ausência de recarregamento, navegação e larguras de 320, 390, 768 e 1440 pixels. Ele requer o Vite já ativo com a API local ativa e um Playwright disponível no ambiente, sem adicionar dependências ao projeto:

```powershell
# Informe o caminho de um módulo Playwright já disponível no seu ambiente.
$env:PLAYWRIGHT_MODULE = 'C:\caminho\para\playwright\index.mjs'
node scripts/sprint4.browser.mjs
node scripts/sprint6.browser.mjs
```

O teste da Sprint 6 cobre carregamento, erro, nova tentativa, lista vazia e data do cabeçalho. Ambos os scripts usam Microsoft Edge por padrão e `http://127.0.0.1:5173`. É possível definir `BROWSER_CHANNEL` e `BASE_URL` para outro navegador instalado e endereço.

## Organização das branches

`main` contém a versão estável publicada; `develop` integra o desenvolvimento. A Sprint 4 é preparada em `feature/sprint-4-interatividade`, sem publicação automática. Antes de integrar uma entrega, validar lint, build, testes e navegação responsiva.

## Sprint 5 — Modelos e DAOs

Os DAOs preservam o contrato acadêmico da Sprint 5 e consultam os endpoints HTTP da Sprint 6. Cada tela carrega a lista pelo DAO e usa os objetos já recebidos ao trocar a seleção.

```text
src/models/
  Unidade.js
  Cliente.js
  Evento.js
  RegistroSaude.js
  validacao.js
src/dao/
  UnidadeDAO.js
  ClienteDAO.js
tests/sprint5/
  modelos.test.js
  daos.test.js
```

- `Unidade` preserva os campos de `tenants`, incluindo as séries posicionais, o funil e a distribuição de saúde.
- `Cliente` preserva o vínculo por `tenantId`. `getEventos()` e `getHistoricoSaude()` retornam novas listas de instâncias encapsuladas, na ordem do JSON.
- `Evento` mantém o horário original em texto, sem fuso. O getter `valor` retorna `undefined` quando ausente e preserva zero.
- `RegistroSaude` mantém a data original e valida o score entre 0 e 100.

Os modelos usam atributos privados, getters e cópias dos dados mutáveis. Os métodos dos DAOs são assíncronos:

| DAO | Métodos |
| --- | --- |
| `UnidadeDAO` | `listar()`, `buscarPorId(id)` |
| `ClienteDAO` | `listar()`, `buscarPorId(id)`, `listarPorUnidade(tenantId)` |

Buscas sem correspondência retornam `null`, listagens vazias retornam `[]` e argumentos que não sejam strings não vazias são rejeitados com `TypeError`. Os IDs são comparados com o texto original.

Exemplo para um módulo executado pelo Vite:

```js
import { Unidade } from './src/models/Unidade.js';
import { Cliente } from './src/models/Cliente.js';
import { UnidadeDAO } from './src/dao/UnidadeDAO.js';
import { ClienteDAO } from './src/dao/ClienteDAO.js';

const unidades = new UnidadeDAO();
const clientes = new ClienteDAO();
console.log((await unidades.listar()).length); // 4
console.log((await unidades.buscarPorId('vetor-sul')) instanceof Unidade);
console.log((await clientes.listar()).length); // 3
console.log((await clientes.buscarPorId('cli-timeline-001')) instanceof Cliente);
console.log((await clientes.listarPorUnidade('vetor-sul')).map(cliente => cliente.nome));
```

Com o Node 26 disponível no ambiente do projeto, execute os testes na raiz:

```powershell
node --test tests src/pages/Comparativo/indicadores.test.js
npm.cmd run lint
npm.cmd run build
```

O contrato dos DAOs foi definido para a atividade acadêmica. Ele não constitui uma API oficial da Primora.
