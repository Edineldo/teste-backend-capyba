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
- SWAGGER :white_check_mark:
- README :white_check_mark:

- Bônus:

- Deploy :white_check_mark:
- Endpoint para alterar senha com confirmação da senha atual :white_check_mark:
- Seed :white_check_mark:

### Regras de negócio:
Todos os fluxos tecnicamente dependem que o usuário esteja registrado. Daí, a partir do endpoint de login, é gerado um token,
usado para a validação de sessão em todos os outros fluxos. Essa sessão guardada no banco é apagada com o endpoint de logout.

A partir do registro, o endpoint de mandar um email com um token de verificação. Ele reenvia caso seja invocado de novo, sempre guardando o novo token gerado. Daí pode ser chamado o endpoint de confirmação que receberá um token passado pelo usuário e compara com o enviado por email.

Com a sessão gerada, o usuário consegue ter acesso a lista de modelos disponíveis, com opções de filtragem por marca/modelo, tipo (picape, esportivo, etc), e opções de ordenação, tanto alfabética, por nome de modelo, como crescente por preço de taxa de aluguel.
Esse endpoint também faz a vericifação prévia se o usuário realizou a confirmação de email, se sim, ele terá acesso a itens da persistidos com o atributo de restrito, na tabela de modelos.

O fluxo de agendamento de aluguel criando um agendamento de aluguel via id de modelo passado pelo usuário. Também listando os agendamentos já feitos pelo dado usuário, e possibilitanto o cancelamento de um desses.


### Instalação do projeto



