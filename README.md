#### teste-backend-capyba

Repositório referente a implementação do desafio de back-end proposto no processo seletivo da Capyba Software.
A API desenvolvida dá suporte a um pseudo micro sistema de agendamento de aluguel de carros.

A aplicação foi desenvolvida em Node.js em conjunto com o ORM Sequelize, este responsável pela interação da aplicação com o banco de dados

### Features propostas:

- Endpoint para cadastro de usuário :white_check_mark:
- Endpoint de termos de uso e políticas de privacidade :x:
- Endpoint Login :white_check_mark:
- Endpoint Logout :white_check_mark:
- Endpoint com listagem de itens públicos e também de itens privados, dependendo da autenticação da seesão do usuário :white_check_mark:
- Endpoint para editar perfil :white_check_mark:
- Endpoint para confirmar token recebido por email :white_check_mark:
- Endpoint para reenviar token para email :white_check_mark:
- Testes :x:
- SWAGGER :x:
- README :white_check_mark:

- Bônus:

- Endpoint para alterar senha com confirmação da senha atual :white_check_mark:
- Seed :white_check_mark:

### Regras de negócio:
Todos os fluxos tecnicamente dependem que o usuário esteja registrado. Daí, a partir do endpoint de login, é gerado um token,
usado para a validação de sessão em todos os outros fluxos. Essa sessão guardada no banco é apagada com o endpoint de logout.

A partir do registro, o endpoint de mandar um email com um token de verificação. Ele reenvia caso seja invocado de novo, sempre guardando o novo token gerado. Daí pode ser chamado o endpoint de confirmação que receberá um token passado pelo usuário e compara com o enviado por email.

Com a sessão gerada, o usuário consegue ter acesso a lista de modelos disponíveis, com opções de filtragem por marca/modelo, tipo (picape, esportivo, etc), e opções de ordenação, tanto alfabética, por nome de modelo, como crescente por preço de taxa de aluguel.
Esse endpoint também faz a vericifação prévia se o usuário realizou a confirmação de email, se sim, ele terá acesso a itens da persistidos com o atributo de restrito, na tabela de modelos.

O fluxo de agendamento de aluguel criando um agendamento de aluguel via id de modelo passado pelo usuário. Também listando os agendamentos já feitos pelo dado usuário, e possibilitanto o cancelamento de um desses.


### Estrutura do projeto

| **Diretório**  | **Responsabilidade** |
| ------------- | ------------- |
| */Migrations* | *Migrations do Banco de dados* |
| */Seeders* | *Seeders usadas no Banco de dados* |
| */src/config* | *Arquivo de configuração do BD* |
| */src/controllers* | *Controllers da aplicação* |
| */src/middlewares* | *Middlewares da aplicação* |
| */src/models* | *Modelos dos objetos implementados* |
| */src/controllers* | *Controllers da aplicação* |
| */src/repositories* | *Repositórios de métodos de interação direta com o BD* |
| */src/Router* | *Rotas da aplicação* |
| */src/services* | *Métodos responsáveis de manter a regra de negócio * |


### Descrição das rotas:
| **'/user'** | **Funcionalidade** |
|-------------|--------------------|
|post: '/register'| registro de usuário, com atributos recebidos por body |
|post: '/login'| criação de sessão, com atributos recebidos por body |
|delete: 'login'| encerramento da sessão través do token da mesma passada pelo header authorization |
|put: '/password'| atualização de senha, com sessão verificada por header, e atributos de senha atual e nova recebidos por body |
|put: '/register'| atualização dos demais dados de usuário, com atributos recebidos via body |

| **'/auth'** | **Funcionalidade** |
|-------------|--------------------|
|post: '/send'| envia email de confirmação para o email de usuário cadastrado e guarda o código enviado, sessão é verificada via header |
|post: '/confirm'| verifica o código passado via body, com o enviado ao email

| **'/cars'** | **Funcionalidade** |
|-------------|--------------------|
|get: '/cars'| verifica sessão do usuário via header, e lista itens de acordo com os campos de filtragem passados por query, verificando previamente confirmação do email, exibindo assim os itens restritos ou não |
|post: '/schedule'| Cria agendamento de aluguel, com atributos recebidos via body |
|get: '/schedule'| Lista agendamentos do usuário na sessão, verificada via header |
|delete: '/schedule'| Cancela agendamento de aluguel, com atributos recebidos via body |


### Instalação do projeto

-primeiro passo: é necessária a instalação do Node.js (versão LTS, recomendada) na máquina, que pode ser realizada nesse site: https://nodejs.org/en/download/;

-segundo passo: Download deste repositório para a máquina, que pode ser via ZIP ou a seguinte linha de comando:
```
-git clone https://github.com/Edineldo/teste-backend-capyba.git
```
-terceiro passo: Instalação das dependências no diretório do projeto via:
```
npm install
```

-configuração das variáveis de ambiente: Anexado junto ao email, existe um arquivo txt que serve como uma cópia dos valores do arquivo que configura as variáveis de ambiente na raiz do projeto. Na raiz do repositório clonado, existe um .envexample, basta renomealo para .env e copiar o conteúdo contido no txt junto ao email. Essas variáveis configram alguns valores importantes no projeto, tais quais usados na conexão com o banco de daos, verificação de email, e geração de sessão.

-Ultimo passo: Basta executar o projeto, usando:
```
npm start
```

-bônus: Os dados já existe um banco online, que persiste os dados da aplicação. Mas caso seja usado uma conexão com outro banco, o banco pode ser migrado usando o seguinte comando:
```
npx sequelize-cli db:migrate
```

em seguida, populado com as seeds que populam as seguintes tabelas:
Users;
Modelinfos;
Cars;

```
npx sequelize-cli db:seed:all
```
faz com que todas sejam executadas de uma vez, em ordem de criação. Caso queira executar uma de cada vez:
```
sequelize db:seed --seed #nome da seed específica
```


