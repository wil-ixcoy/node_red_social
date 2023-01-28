const { createPool } = require("mysql2");
const boom = require("@hapi/boom");
const { config } = require("../config");

const DATABASE_URL = config.mysql_url;
const ser = config.servidor;
const user = config.usuario;
const pd = config.password;
const bd = config.bd;

const dbconf = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "red_social",
  port: 3308,
};

let connection;

function connectDB() {
  connection = createPool(dbconf);
  console.log("DB mysql Connected! no problem");
}

connectDB();
async function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length <= 0) {
        reject(boom.badRequest("No hay datos"));
      } else {
        resolve(rows);
      }
    });
  });
}
async function getOne(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      [id],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      }
    );
  });
}

async function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, rows) => {
      if (err) {
        return reject(boom.badRequest("Ha sucedido un error"));
      } else {
        return resolve(rows);
      }
    });
  });
}
async function update(table, id, data) {
  return new Promise((resolve, reject) => {
    if (data.id) {
      reject(boom.badRequest("No se puede actualizar el id"));
    } else {
      connection.query(
        `UPDATE ${table} SET ? WHERE id = ?`,
        [data, id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    }
  });
}
async function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
async function query(table, q) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, q, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  list,
  getOne,
  insert,
  update,
  remove,
  query,
};
