const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/MovieWebProject");

const db = mongoose.connection;

db.once("open" , (err) => {
    err ? console.log(err) : console.log("Mongodb Database Connected");
})

module.exports = db;