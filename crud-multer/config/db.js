const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/CRUD_with_img", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open",(err)=>{
    err ? console.log(err) : console.log("Database Connected");
})

module.exports = db;
