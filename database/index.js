var path = require('path');
var dbPath = path.resolve(__dirname, '../db/contact.db');
console.log('dbPath', dbPath);
var knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: dbPath
    }
});


module.exports = knex;