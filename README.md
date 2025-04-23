# SISTEMA DE LOCAÇÕES

Este é um sistema simples de cadastro e gerenciamento de locações, clientes e reservas. O projeto foi desenvolvido como estudo, utilizando Java (Spring Boot) no backend e React no frontend, com visual em tema escuro estilo dashboard.

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- Postman (para testes de endpoints)
- IntelliJ IDEA

### Frontend
- React
- Vite
- Axios
- CSS customizado
- Visual Studio Code

## Como Executar o Projeto

### Pré-requisitos
- Java 17
- Node.js + npm
- MySQL
- IntelliJ IDEA (para o backend)
- VS Code (para o frontend)

### Backend

1. Clone o projeto:
```bash
git clone https://github.com/Ch-cruz-770/Sistema-Loca-es.git
```

2. Abra a pasta do backend no IntelliJ IDEA.

3. Configure o arquivo `application.properties` com os dados do seu banco MySQL:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/locacoes
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

4. Execute a aplicação (Run -> Run application).

### Frontend

1. Abra a pasta do frontend no VS Code.

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor React:
```bash
npm run dev
```

4. Acesse: [http://localhost:3000](http://localhost:3000)