require('dotenv').config();

const { Sequelize } = require('sequelize');
const initModels = require('./init-models');
const db = {}
const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
});
module.exports = { sequelize, ...initModels(sequelize) }