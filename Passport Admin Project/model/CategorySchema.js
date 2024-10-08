const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    CategoryName : {
        type : String,
        required : true
    },
    CategoryNumber : {
        type : Number,
        required : true
    },
    CategoryImage : {
        type : String,
        required : true
    }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;