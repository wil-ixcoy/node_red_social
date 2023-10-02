require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  secret_jwt: process.env.SECRET_JWT,
  mysql_url: process.env.MYSQL_URL,
  servidor: process.env.SERVIDOR,
  usuario: process.env.USUARIO,
  password: process.env.PASSWORD,
  bd: process.env.BD,
  mysqlService: {
    port: process.env.MYSQ_LSRV_PORT || 3001
  }
};

module.exports = { config };
