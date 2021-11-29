const { Sequelize } = require('sequelize');
const { dbUser, dbPassword, dbHost, dbName, dbPort } = require('../utils/config');
const usersFactory = require('./users');
const booksFactory = require('./books');


const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, {
    logging: false,
    native: false,
});

const User = usersFactory(sequelize);
const Book = booksFactory(sequelize);

User.hasMany(Book);

Book.belongsTo(User);

module.exports = {
    conn: sequelize,
    User,
    Book,
}