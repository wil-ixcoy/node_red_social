require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  secret_jwt: process.env.SECRET_JWT,
  mysql_host: process.env.MYSQL_HOST,
  mysql_user: process.env.MYSQL_USER,
  mysql_password: process.env.MYSQL_PASSWORD,
  mysql_database: process.env.MYSQL_DATABASE,
}

module.exports = { config };