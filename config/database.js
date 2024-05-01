// config/database.js
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('ebook', 'root', '', {
    connectionLimit:10,
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

module.exports = sequelize;
