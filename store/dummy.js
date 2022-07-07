const database = {
    users: [
        {
            id: "1",
            name: 'John Doe',
            email: 'wwwwwwwwwwww.com',
        },
        {
            id: "2",
            name: 'Jane Doe',
            email: 'wwwwwwwwwwww.com',
        },
    ],

};
async function upsert(tabla, data) {
    if (!database[tabla]) {
        database[tabla] = [];
    }

    database[tabla].push(data);

    console.log(database);
}

async function list(tabla) {
    return database[tabla] || [];
}

async function getOne(tabla, id) {
    let collection = await this.list(tabla);
    return collection.find(item => item.id === id) || null;
}
async function update(tabla, id, data) {
    database[tabla].push(data);
}
async function remove(tabla, id) { return true }

async function query(tabla, q) {
    let collection = await this.list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return collection.filter(item => item[key] === q[key]) || null;

}
module.exports = {
    upsert,
    list,
    getOne,
    update,
    remove,
    query
}
