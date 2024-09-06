const express = require("express");
const port = 2020;

const DataBase = require("./config/DataBase");
const MovieSchema = require("./model/schemaMovie")
const app = express();

app.set("view engine","ejs");
const path = require("path")

app.use(express.urlencoded());

app.use("/uploads",express.static(path.join(__dirname , "uploads")))

const routes = require("./routes")

app.use("/",routes)

app.listen (port , (err) => {
    err ? console.log(err) : console.log(`Server Started on Port ${port}`);
})
