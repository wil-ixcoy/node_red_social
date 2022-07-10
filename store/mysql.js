const mysql = require("mysql");

const { config } = require("../config");

const DATABASE_URL = config.mysql_url;


let conection;

let handlerConnection = () => {
    conection = mysql.createConnection(DATABASE_URL);
    conection.connect((err) => {
        if (err) {
            console.log(err);
            setTimeout(handlerConnection, 1000);
        } else {
            console.log("Connected to database");
        }
    }
    );
    conection.on("error", (err) => {
        console.log(err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handlerConnection();
        } else {
            throw err;
        }
    }
    );
}

handlerConnection();

async function list(table) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        }
        );
    }
    );
}
async function getOne(table, id) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        }
        );
    }
    );
}
async function insert(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data, (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        }
        );
    }
    );
}
async function update(table, id, data) {
    return new Promise((resolve, reject) => {
        conection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        }
        );
    }
    );

}
async function remove(table, id) {
    return new Promise((resolve, reject) => {
        conection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        }
        );
    }
    );
}
async function query(table, q) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE ?`, q, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        }
        );
    }
    );
}

module.exports = {
    list,
    getOne,
    insert,
    update,
    remove,
    query
}