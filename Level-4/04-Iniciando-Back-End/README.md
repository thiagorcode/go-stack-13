# Recuperação de senhação

**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazons SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regra de Negócio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confimar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualiazr seu nome, e-mail e senha.

**RN**

- O usuário não pode alterar seu e-mail para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confimar a nova senha;

# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O usuáro deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos de prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo-real utilizando socket.io

**RN**

# Agendamento de serviços

**RF**

-  O usuário deve poder listar todos prestadores de serviço cadastrados;
-  O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel;
-  O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
-  O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 08 às 18h (Primeiro às 08h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo.
