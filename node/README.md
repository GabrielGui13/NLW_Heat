### Comandos Importantes
* ts-node-dev => para compilar a aplicacao em Typescript
* ```shell 
    yarn tsc --init
    ```
    => cria o tsconfig.json 
* ```shell 
    yarn prisma init
    ```
    => cria um arquivo .env com a DATABASE_URL, e uma pasta com schema.prisma, que serve para configurar database, tabelas, etc
* ```shell
    yarn prisma migrate dev
    ```
    => roda o prisma.schema, cria a database, a query, etc

### Github OAuth
* Acessa o https://github.com/settings/developers
* Clica em "New OAuth App"
* Coloca o nome e descricao da aplicacao
* A Homepage URL eh a url da sua aplicacao normal (http://localhost:4000)
* A Authorization Callback URL eh o endpoint que o Github vai redirecionar para fazer a autenticação
* O Client ID eh o ID da aplicacao
* O Client Secret eh a chave criptografada da aplicacao


### Pastas
* _src_ => detem todo o codigo da aplicacao
* _prisma_ => criado automaticamente pelo "yarn prisma init", tem o schema e configuracoes da database
* _services_ => tem as aplicacoes com as regras de negocio
* _controllers_ => aplicacoes responsaveis por lidar com as requisicoes do server, manda para os services que contem a logica, e depois retorna tudo

