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
async function create(data) { }

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
    create,
    list,
    getOne,
    update,
    remove
}
