const mysql = require("mysql");

const { config } = require("../config");

const dbConfig = {
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
}

let conection;

let handlerConnection = () => {
    conection = mysql.createConnection(dbConfig);
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
module.exports = {
    list
}