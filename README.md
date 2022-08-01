# <p align = "center"> Sing Me A Song </p>

<p align="center">
   <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/studio-microphone_1f399-fe0f.png" width="150"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Fernanda-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/acfernanda/sing-me-a-song?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂.

---

## :computer: Tecnologias e Conceitos

O objetivo do projeto foi desenvolver testes unitários para a camada de services com 100% de coverage, testes de integração para todas as rotas e testes ponta a ponta (E2E) para os fluxos de uso do sistema.

---

## :rocket: Rotas

```yml
POST /recommendations
    - Rota que adiciona uma nova recomendação de música.
    - headers: {}
    - body:
        {
          name: "Falamansa - Xote dos Milagres",
          youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        }
```

```yml
POST /recommendations/:id/upvote
    - Rota que adiciona um ponto à pontuação da recomendação.
    - headers: {}
    - body: {}
```

```yml
POST /recommendations/:id/downvote
    - Rota que remove um ponto da pontuação da recomendação. Se a pontuação fica abaixo de -5, a recomendação é excluída.
    - headers: {}
    - body: {}
```

```yml
GET /recommendations
    - Rota que pega todas as últimas 10 recomendações.
    - headers: {}
    - body: {}

```

```yml
GET /recommendations/:id
    - Rota que pega uma recomendação pelo seu ID.
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/random
    - Rota que pega uma recomendação aleatória.
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/top/:amount
    - Rota que lista as músicas com maior número de pontos e sua pontuação. São retornadas as top x músicas (parâmetro :amount), ordenadas por pontuação (maiores primeiro).
    - headers: {}
    - body: {}
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/acfernanda/sing-me-a-song
```

Depois, dentro da pasta back-end, rode o seguinte comando:

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```

Dentro da pasta front-end, rode o seguinte comando:

```
npm install
```

Finalizado o processo, é só subir a aplicação:

```
npm run start
```
