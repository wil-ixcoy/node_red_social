const database = {
    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'wwwwwwwwwwww.com',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'wwwwwwwwwwww.com',
        },
    ],

};
async function create(data) { }

async function findAll(table) {
    return database[table];
}

async function findOne(table, id) {
    let collection = this.findAll(table);
    return collection.find(item => item.id === id);
}
async function update(table, id, data) {
    database[table].push(data);
}
async function remove(table, id) { return true }
module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
}
