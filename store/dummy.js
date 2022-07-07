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

async function list(table) {
    return database[table];
}

async function getOne(table, id) {
    let collection = await this.list(table);
    return collection.find(item => item.id === id) || null;
}
async function update(table, id, data) {
    database[table].push(data);
}
async function remove(table, id) { return true }
module.exports = {
    upsert,
    list,
    getOne,
    update,
    remove
}
