# README — PokeList App

## 1. Propósito da aplicação

A **PokeList App** é uma pequena aplicação front-end em React + TypeScript que consome a **PokeAPI** para exibir listas de Pokémon de forma dinâmica. O objetivo é demonstrar consumo de API, tipagem com TypeScript, estilização com `styled-components` e navegação simples com `react-router-dom`, além de fornecer componentes reutilizáveis que permitem filtrar por tipo e visualizar detalhes de cada Pokémon.

## 2. Funcionalidades entregues

* **Lista de Pokémons:**

  * Carregamento de uma lista principal de Pokémons (ex.: 10 aleatórios).
  * Carregamento de uma segunda lista “extra” (também 10 aleatórios) que pode ser exibida quando o `prop` `showExtra` estiver ativo.
  * Filtro por **tipo** (select) — quando um tipo é selecionado a lista é recarregada pelo tipo (consulta ao endpoint `/type/{type}`).
  * Exibição de nome (capitalizado), imagem (artwork oficial quando disponível) e tipos (lista) de cada Pokémon.
  * Estados de **loading** e **error** tratados com mensagens amigáveis.
  * Links para rota de detalhe do Pokémon (`/pokemon/:name`) usando `react-router-dom`.

* **Página de Detalhes do Pokémon:**

  * Exibição do **nome** e **imagem oficial**.
  * Listagem dos **tipos** do Pokémon.
  * **Descrição** extraída do endpoint `/pokemon-species`, exibindo o flavor text em inglês.
  * Lista com os **golpes principais** (primeiros 5 movimentos).
  * Integração com `ThemeContext` para aplicar cores dinâmicas no fundo, textos e seções.

* **Estilização:**

  * Estilização encapsulada via `styled-components`.
  * Uso de `ThemeContext` para background e cor do texto de acordo com o tema ativo.

* **Tipagem em TypeScript:**

  * Interfaces para as estruturas principais (`PokemonResumo`, `PokemonDetalhes`, `PokemonTypeSlot`, `PokemonMoveSlot`, etc.).

## 3. Ferramentas utilizadas e justificativa

* **React** — biblioteca principal para construir a interface declarativa baseada em componentes.
* **TypeScript** — adiciona tipagem estática, reduz bugs em tempo de desenvolvimento e facilita a manutenção do código.
* **styled-components** — permite escrever estilos encapsulados e dinâmicos diretamente nos componentes.
* **react-router-dom** — para roteamento e navegação entre a lista e a página de detalhe do Pokémon.
* **Fetch API** (nativo) — consumo direto da PokeAPI sem camada adicional; simples e suficiente para o desafio.
* **PokeAPI ([https://pokeapi.co/](https://pokeapi.co/))** — fonte de dados pública e sem necessidade de chave.
* **(Recomendado) Vite** — para devserver rápido e build otimizado.

## 4. Decisões adotadas (planejamento e execução)

* **Busca por tipo no servidor**: ao selecionar um tipo usamos o endpoint `/api/v2/type/{type}` para obter apenas Pokémons daquele tipo — isso evita primeiro baixar todo o catálogo e depois filtrar apenas os já renderizados.
* **Dois batches (principal + extra)**: o componente carrega duas listas independentes para permitir ao `prop` `showExtra` controlar a exibição de uma segunda leva.
* **Randomização via `shuffle()`**: para trazer variedade, embaralhamos a lista de resultados antes de fatiar os primeiros `n`.
* **Página de detalhes**: incluímos um componente que consome os endpoints `/pokemon/{name}` e `/pokemon-species/{name}`, trazendo informações mais completas (tipos, golpes, descrição). Essa decisão garante maior valor para o usuário, indo além da listagem básica.
* **Uso de TypeScript**: protege contra erros comuns (ex.: campos ausentes na resposta JSON).
* **Tratamento básico de erros e loading**: mensagens simples informam o usuário sobre estados de carregamento e falhas.
* **Simplicidade sobre otimização prematura**: dado o escopo do desafio optamos por não introduzir cache complexo.

## 5. Passo a passo para rodar o projeto (localmente)

### Pré-requisitos

* Node.js (recomendado v16 ou v18+)
* npm ou yarn
* Git (opcional)

### Clonar o repositório (opcional)

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPO.git
cd SEU_REPO
```

### Instalar dependências

```bash
npm install
# ou
yarn install
```

### Rodar em modo desenvolvimento

Se o projeto foi criado com Vite:

```bash
npm run dev
# ou
yarn dev
```

Se foi criado com Create React App (CRA):

```bash
npm start
# ou
yarn start
```

Abra o navegador em `http://localhost:5173` (Vite) ou `http://localhost:3000` (CRA).

### Build para produção

```bash
npm run build
# ou
yarn build
```

Preview (Vite):

```bash
npm run preview
# ou
yarn preview
```

## 6. Estrutura sugerida de arquivos

```
/src
  /components
    List.tsx
  /pages
    PokemonDetalhesPage.tsx
  /contexts
    themeContext.tsx
  App.tsx
  main.tsx
package.json
README.md
```

## 7. Créditos

* Dados: PokeAPI ([https://pokeapi.co](https://pokeapi.co))
* Implementação: SerpianDevStack (João Lucas Gomes)
