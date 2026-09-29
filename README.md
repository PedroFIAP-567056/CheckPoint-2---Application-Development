# Elenco em destaque

Aplicação web feita com **HTML, CSS e JavaScript puros** (sem bibliotecas ou recursos externos) que exibe e filtra um catálogo de atores e atrizes a partir do array de objetos em `dados.js`.

Checkpoint 2 | FIAP | Pedro Ricardo de Almeida (RM567056)

## Funcionalidades

- **Grid de cards** com todos os 75 atores e atrizes do array, contendo foto, nome, país e data de nascimento.
- **Busca em tempo real** por nome: o `input` (`type="text"`) dispara a filtragem via `oninput`, usando `filter()` e `includes()`.
- A busca não diferencia maiúsculas/minúsculas e ignora acentos; o trecho encontrado é destacado no nome.
- Contador de resultados e estado vazio com botão para limpar a busca.
- Extras: idade calculada automaticamente, país traduzido com bandeira, data por extenso em pt-BR, atalhos de teclado (`/` foca a busca, `Esc` limpa) e layout responsivo.

## Como a filtragem funciona

```js
function filtrarAtores() {
  const termo = normalizar(campoBusca.value);
  const filtrados = atores.filter((ator) => normalizar(ator.nome).includes(termo));
  renderizar(filtrados, termo);
}
```

## Estrutura

```
├── index.html   # estrutura da página
├── style.css    # estilos (tema escuro, grid responsivo)
├── script.js    # renderização dos cards e filtragem
├── dados.js     # array de atores e atrizes
└── snapshots/   # capturas de tela
```

## Como executar

Basta abrir o arquivo `index.html` em qualquer navegador.

## Capturas de tela

**Listagem completa**

![Listagem completa dos atores e atrizes](snapshots/default.png)

**Busca filtrando por "al"**

![Busca filtrando pelo termo "al"](snapshots/filter.png)

**Nenhum resultado encontrado**

![Estado vazio da busca](snapshots/noresult.png)
