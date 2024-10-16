const SequelizeAuto = require('sequelize-auto');
require('dotenv').config();
const auto = new SequelizeAuto(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        directory: './models', // where to write files
        port: process.env.DB_PORT,
    }
);

auto.run().then(data => {
    console.log(data.tables); // table and field list
});