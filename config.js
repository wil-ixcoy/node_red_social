require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  secret_jwt: process.env.SECRET_JWT,
  mysql_url: process.env.MYSQL_URL,
}

module.exports = { config };