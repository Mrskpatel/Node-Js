const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    ProductName : {
        type: String,
        required: true
    },
    ProductCompany : {
        type: String,
        required: true
    },
    ProductDescription : {
        type: String,
        required: true
    },
    ProductPrice :{
        type: Number,
        required: true
    },
    ProductDiscountPrice : {
        type: Number,
        required: true
    },
    ProductRating : {
        type: Number,
        required: true
    },
    Category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    ProductImage : {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product", CategorySchema);

module.exports = Product;