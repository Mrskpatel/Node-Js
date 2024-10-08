const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    subCategoryName : {
        type : String,
        required : true
    },
    CategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
})

const SubCategory = mongoose.model("SubCategory", CategorySchema);

module.exports = SubCategory;