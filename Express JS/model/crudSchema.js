const mongoose = require('mongoose');

const crud = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const CrudTbl = mongoose.model("crud" , crud)

module.exports = CrudTbl;