# Primora — Painel de Inteligência Multi-tenant

Protótipo de um painel de inteligência para acompanhar indicadores comerciais e a saúde da carteira de clientes de unidades regionais. Desenvolvido em React, Vite e Ant Design, com interface responsiva e navegação entre três páginas.

## Contexto acadêmico

Este projeto integra o Projeto Integrador da Primora. O desafio propõe uma interface para visualizar indicadores por unidade, comparar desempenhos de forma proporcional ao porte das carteiras e consultar a jornada dos clientes.

A Sprint 1 estabelece a estrutura visual, as páginas e a navegação. O termo **multi-tenant** representa a proposta do painel; o isolamento de dados entre unidades ainda não está implementado.

## Tecnologias

Versões declaradas no `package.json` (os intervalos com `^` permitem atualizações compatíveis):

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| React e React DOM | `^19.3.1` | Componentes e renderização da interface |
| Vite | `^8.3.5` | Desenvolvimento local e build |
| Ant Design | `^6.6.8` | Layout, navegação e componentes visuais |
| Ant Design Icons | `^6.3.4` | Ícones da interface |
| React Router | `^8.5.1` | Rotas e navegação |
| ESLint | `^10.13.0` | Análise estática do código |
| Plugin React para Vite | `^6.1.2` | Integração do React com o Vite |

O código da aplicação utiliza JavaScript com JSX e CSS. O `package-lock.json` registra as versões resolvidas das dependências.

## Implementado na Sprint 1

- Layout compartilhado com cabeçalho, navegação e rodapé.
- Tema com cores inspiradas na identidade visual da Primora.
- Três páginas acessíveis pelo menu, com destaque da rota ativa.
- Menu lateral de 260 px em desktop (a partir de 992 px).
- Drawer em telas menores, aberto pelo botão do cabeçalho e sobreposto ao conteúdo, sem comprimir a página.
- Fechamento do Drawer por seleção de rota, botão de fechar, máscara ou tecla Esc.
- Organização responsiva dos cartões e adaptação do cabeçalho para telas menores.
- Redirecionamento de rotas desconhecidas para a Visão Geral.

## Páginas

| Página | Rota | Conteúdo atual |
| --- | --- | --- |
| Visão Geral | `/` | Cartões com títulos e textos indicativos para Unidades, Engajamento, Funil Comercial e Saúde da Carteira. |
| Comparativo entre Unidades | `/comparativo` | Aviso sobre comparação proporcional e espaços reservados para ranking, gráfico e tabela comparativa. |
| Histórico de Clientes | `/historico-clientes` | Seleção de cliente desabilitada, cartão de informações e estado vazio para a linha do tempo de eventos. |

Os espaços reservados apresentam a estrutura pretendida. Não há cálculos de indicadores, ranking preenchido, gráfico renderizado ou consulta de histórico nesta sprint.

## Estrutura principal

```text
primora-painel-inteligencia/
├── public/                      # Arquivos estáticos
├── src/
│   ├── assets/                  # Recursos visuais
│   ├── components/
│   │   └── layout/
│   │       ├── AppLayout.jsx    # Layout compartilhado e controle do menu
│   │       └── Sidebar.jsx      # Navegação em Sider ou Drawer
│   ├── pages/
│   │   ├── VisaoGeral/
│   │   │   └── index.jsx
│   │   ├── Comparativo/
│   │   │   └── index.jsx
│   │   └── HistoricoClientes/
│   │       └── index.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx        # Definição das rotas
│   ├── styles/
│   │   └── global.css           # Estilos globais e responsividade
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Inicialização e configuração do tema
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Pré-requisitos

- Node.js compatível com o Vite instalado: `^20.19.0` ou `>=22.12.0`.
- npm disponível no terminal.
- Git para clonar o repositório e trabalhar com branches.

## Instalação e execução

Para obter uma nova cópia do projeto:

```powershell
git clone https://github.com/guilhermelima2705/desafio-primora-painel-inteligencia.git
cd desafio-primora-painel-inteligencia
git switch develop
```

Se o projeto já estiver no caminho local utilizado durante o desenvolvimento:

```powershell
Set-Location 'C:\Users\Usuario\Projetos\primora-painel-inteligencia'
git switch develop
```

Na raiz do projeto, instale as dependências e inicie o servidor:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`. A porta pode mudar se já estiver em uso. Para encerrar o servidor, pressione `Ctrl+C`.

Os exemplos utilizam `npm.cmd` para execução no Windows PowerShell. Em outros ambientes, utilize `npm`.

## Build e lint

Gerar a versão de produção na pasta `dist/`:

```powershell
npm.cmd run build
```

Verificar o código com ESLint:

```powershell
npm.cmd run lint
```

Visualizar localmente o build gerado:

```powershell
npm.cmd run preview
```

Execute o build antes do preview. O preview serve para conferir a versão gerada localmente.

## Organização das branches

- `main`: referência das entregas consolidadas.
- `develop`: integração do desenvolvimento da sprint e base para novas alterações.
- `feature/*`: branches futuras para tarefas específicas, criadas a partir de `develop`, por exemplo `feature/documentacao-sprint-1`.

Esse é o fluxo de trabalho proposto; não pressupõe regras automáticas de proteção de branches no GitHub.

## Contribuição via Pull Request

1. Atualize sua branch `develop` e crie uma branch `feature/*` com nome relacionado à tarefa.
2. Faça alterações com escopo definido, preservando a organização e o padrão visual do projeto.
3. Execute build e lint. Para mudanças de interface, confira também a navegação e a responsividade.
4. Revise o diff e registre apenas os arquivos necessários em um commit.
5. Envie a branch e abra um Pull Request direcionado a `develop`, descrevendo o objetivo, as alterações e as verificações realizadas. Inclua capturas de tela quando forem úteis.
6. Aguarde a revisão antes da integração. Entregas consolidadas podem seguir de `develop` para `main` por Pull Request.

Repositório: [desafio-primora-painel-inteligencia](https://github.com/guilhermelima2705/desafio-primora-painel-inteligencia).

## Situação atual

**Sprint 1: protótipo visual com navegação.** A aplicação ainda não possui integração com dados reais, API ou backend, autenticação, persistência ou isolamento multi-tenant. Filtros funcionais, cálculos, gráficos e histórico real não estão implementados.

As páginas demonstram a estrutura da solução e servem de base para a evolução nas próximas sprints.
