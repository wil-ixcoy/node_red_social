const request = require("request");
const boom = require("@hapi/boom");
const { config } = require("../config");

function createRemoteDB(host, port) {
  const URL = `http:// ${host}:${port}`;

  function list(table) {}
  function getOne(table, id) {}
  function insert(table, data) {}
  function query(table, query, join) {}

  function req(method, table, data) {
    let url = `${URL}/${table}`;
    body = "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error(err);
            return reject(boom.badRequest(err));
          }

          const response = JSON.parse(body);
          return resolve(response.body);
        }
      );
    });
  }
  return { list, getOne, insert, query };
}

module.exports = createRemoteDB;
