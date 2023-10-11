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
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || "localhost"
  },
  post: {
    port: process.env.POST_PORT || 3002,
    host: process.env.POST_HOST || "localhost"
  }
};

export default { config };
