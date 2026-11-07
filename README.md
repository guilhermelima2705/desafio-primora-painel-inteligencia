# Primora — Painel de Inteligência Multi-tenant

Projeto Integrador da Primora, desenvolvido com React, Vite e Ant Design. A Sprint 4 adiciona seleção de unidade e cliente com estado React, preservando o redesign e o Comparativo com Recharts.

## Tecnologias

React e React DOM 19, React Router 8, Vite 8, Ant Design 6, Ant Design Icons 6 e Recharts 3. Código em JavaScript/JSX e CSS, com ESLint 10. As versões exatas instaladas são registradas no `package-lock.json`.

## Executar no Windows

Pré-requisitos: Git, Node.js compatível com Vite (`^20.19.0` ou `>=22.12.0`) e npm. O ambiente restaurado foi validado com Node.js 26.13.0 e npm 11.20.0.

```powershell
git clone https://github.com/guilhermelima2705/desafio-primora-painel-inteligencia.git
cd desafio-primora-painel-inteligencia
git switch develop
npm.cmd ci
npm.cmd run dev
```

Para uma cópia já existente, abra um terminal na raiz do repositório e execute os dois últimos comandos. A implementação da Sprint 4 está em `feature/sprint-4-interatividade` enquanto aguarda revisão; para demonstrá-la, utilize essa branch local.

Acesse o endereço informado pelo Vite, normalmente `http://localhost:5173`. Para encerrar, pressione `Ctrl+C`. No VS Code, abra a pasta do repositório ou execute `code .` nessa pasta.

## Páginas e interações da Sprint 4

| Página | Rota | Funcionamento |
| --- | --- | --- |
| Visão Geral | `/` | Select com as quatro unidades oficiais. A seleção atualiza o cartão de carteira, eventos de engajamento de sete dias e sucessos do funil de noventa dias, além dos gráficos de engajamento e saúde da carteira. |
| Comparativo | `/comparativo` | Tabela, ranking e gráfico de risco proporcional das quatro unidades, com as fórmulas e a ordenação existentes preservadas. A tabela tem rolagem horizontal interna. |
| Histórico de Clientes | `/historico-clientes` | Select com os três clientes oficiais. A seleção atualiza nome, identificação, unidade, quantidade de eventos, série de score de saúde e timeline em ordem da data mais recente para a mais antiga. |

Cada Select do Ant Design utiliza `useState` para guardar o ID e `onChange` para atualizar a escolha. A primeira unidade e o primeiro cliente do JSON são as seleções iniciais. Os registros são localizados por ID e transmitidos aos componentes por props. A troca ocorre sem recarregar a página. Ao sair e retornar à tela, a seleção volta ao valor inicial; não há persistência.

Para demonstrar: percorra as quatro unidades e confira o cartão e os gráficos; depois percorra os três clientes e confira perfil, série de saúde e eventos. As tabelas acessíveis em “Consultar…” permitem conferir os valores dos gráficos. Confira também o menu no celular e a tabela do Comparativo.

## Origem e limites dos dados

As três telas importam `src/data/dataset_painel_multitenant.json`, com quatro unidades e três clientes fictícios, gerado em 01/09/2026. O arquivo oficial não é alterado pelas seleções. Não há eventos, valores ou métricas inventados. A timeline ordena uma cópia dos eventos.

Os gráficos mantêm os períodos e os valores do dataset. As fórmulas do Comparativo estão documentadas em `src/pages/Comparativo/README.md`. O projeto é uma demonstração acadêmica, sem backend, API, banco de dados, autenticação, persistência ou isolamento multi-tenant implementado.

## Validação

Execute na raiz do repositório:

```powershell
npm.cmd run lint
npm.cmd run build
node --test src/pages/Comparativo/indicadores.test.js
```

O build gera `dist/`. Para visualizá-lo, execute `npm.cmd run preview` e abra o endereço indicado.

O teste de navegador em `scripts/sprint4.browser.mjs` valida as quatro unidades e os três clientes, os valores exibidos, séries dos gráficos, ordem dos eventos, ausência de recarregamento, navegação e larguras de 320, 390, 768 e 1440 pixels. Ele requer o Vite já ativo e um Playwright disponível no ambiente, sem adicionar dependências ao projeto:

```powershell
# Informe o caminho de um módulo Playwright já disponível no seu ambiente.
$env:PLAYWRIGHT_MODULE = 'C:\caminho\para\playwright\index.mjs'
node scripts/sprint4.browser.mjs
```

Por padrão, utiliza Microsoft Edge e `http://127.0.0.1:5173`. É possível definir `BROWSER_CHANNEL` e `BASE_URL` para outro navegador instalado e endereço.

## Organização das branches

`main` contém a versão estável publicada; `develop` integra o desenvolvimento. A Sprint 4 é preparada em `feature/sprint-4-interatividade`, sem publicação automática. Antes de integrar uma entrega, validar lint, build, testes e navegação responsiva.
