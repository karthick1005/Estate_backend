const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/index');
require('dotenv').config();
const router = require("./src/router/router")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", router)


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    try {
        db.sequelize.authenticate()
        console.log("Database Connection established successfully. ");
        console.log(`Backend running on https://localhost:${process.env.PORT}/`)
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

})
