
# Desafio Back-End - Weef

## Como rodar o projeto?
É possível rodar esse projeto manualmente com seu banco de dados. 

Renomeie o arquivo .env.example para .env e configure no arquivo .env as variaveis ambientes. 
As váriaveis necessárias são: NODE_SECRET para criação e verificação do token de autenticação.
Para trocar o banco é necessário alterar o arquivo schema.prisma dentro da pasta prisma para o banco e alterar o a váriavel ambiente DATABASE_URL para o endereço do banco.

##### Para executar o projeto manualmente siga os comandos abaixo:
`cd test_weef`
`npm i`
`npx prisma generate`
`npm run dev`

##### Para executar os testes automaticos:

`npm run test`

## Requisições

### Endpoint Dos Usuários

**GET ALL**
`/users`

**GET**
`/users/$user_id`

**POST**
`/users`

```curl
{
  "username": string,
  "password": string
}
```

**DELETE**
`/users/$user_id`

**PATCH**
`/users/$user_id`

```curl
{
  "username": string,
  "password": string
}
```

### Endpoint da autenticação
**POST**
`/auth`

```curl
{
  "username": string,
  "password": string
}
```

### Endpoint Do Estacionamento
#### Observações - todas as rotas precisam de um token de autenticação

**GET**
`/parking/value/$license_plate`


**POST**
`/parking/entry`

```curl
{
  "license_plate": string,
  "entry_time": Date
}
```

**POST**
`/parking/exit`

```curl
{
  "license_plate": string,
  "exit_time": Date
}
```

**POST**
`/parking/payment`

```curl
{
  "license_plate": string,
  "amount_paid": number
}
```

![Cachorro programando](https://github.com/owInteractive/desafio-backend/raw/master/media/dog.webp "Cachorro programando")
