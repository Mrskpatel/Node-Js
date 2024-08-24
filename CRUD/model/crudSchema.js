const mongoose = require('mongoose');

const crudBook = mongoose.Schema({
    Title : {
        type : String,
        required : true
    },
    Author : {
        type : String,
        required : true
    },
    Published : {
        type : Number,
        required : true
    },
    Pages : {
        type : Number,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    Copies : {
        type : Number,
        required : true
    }
})

const crudBooks = mongoose.model("crudBook" , crudBook)

module.exports = crudBooks