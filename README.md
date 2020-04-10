# GoStack
Treinamento **GoStack** da [RocketSeat](http://rocketseat.com.br/)

## backen NodeJs

### Métodos HTTP:

- **GET**: buscar informações do backend
- **POST**: criar uma informação no backend
- **PUT**/**PATCH**: alterar uma informação no backend
- **DELETE**: remover uma informação no backend

### Tipos de parâmetros

- **Query Params**: filtros e paginação
- **Route Params**: identificara recursos na hora de atualizar ou deletar
- **Request Body**: conteúdo para criar ou editar um recurso

### Middleware

Interceptador de requisições que pode **interroper** totalmente a requisição ou **alterar** dados da requisição


## frontend ReactJs

- **Babel**: Converte (transpila) código do React para um código que o browser entenda
- **Webpack**: Converte cada tipo de arquivo (.js, .css, .png) de uma maneira diferente
- **Loaders**: são ferramentas utilizadas pelo Webpack para 'dar sentido' para o javascript
  - babel-loader
  - css-loader
  - image-loader
  - etc ... 
- **JSX**: 'HTML' dentro do JavaScript (JavaScript XML)
  
### Conceitos do ReactJs

- **Componente**
- **Propriedade**
- **Estado** & **Imutabilidade**
  
    **useState** -> Hook para manipular as variáveis do React, ela retorna um array de 2 posições
      - Variável: com o seu valor inicial
      - Método: para alterar o valor da variável