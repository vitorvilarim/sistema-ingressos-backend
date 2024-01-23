# sistema-ingressos-backend

## Sobre
Para a implementação utilizei Javascript e Node.js no desenvolvimento, com Express.js como framework para o servidor web, e PostgreSQL como Banco de Dados, aderindo aos princípios SOLID e Clean Code. Foi acrescentado também medidas de segurança, como criptografia e autenticação, usando Json Web Token (JWT) e Bcrypt para proteção de dados sensíveis no banco de dados e no sistema. Além disso, foi incorporado o Nodemailer para o envio de e-mails aos clientes, bem como o PDFMake para gerar recibos em pdf.

A API oferece diversas funcionalidades, tais como:

 - 📂 Cadastro de usuários
 - 🔐 Login com geração de Token
 - 📋 Listagem de eventos
 - 📂 Compra de ingressos
 - 📧 Confirmação de compra por e-mail
 - 📋 Recibo de compra
 


# Tecnologias utilizadas
## Back end
- Javascript
- NodeJs
- ExpressJs
- PostgreSQL


# Como executar o projeto

## Back end
Pré-requisitos: Javascript LTS, NodeJs LTS e PostgreSQL
- Fazer todas as requisições pelo Postman

```bash
# clonar repositório
git clone https://github.com/vitorvilarim/sistema-ingressos-backend

# entrar na pasta do projeto 

# instalar as bibliotecas do projeto
npm install

# executar o projeto
npm run dev
```


# Autor

Vitor Vilarim

https://www.linkedin.com/in/vitor-vilarim/
