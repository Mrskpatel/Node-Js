const userProduct = require("../model/ProductSchema");
const userCategory = require("../model/CategorySchema");
const userSubCategory = require("../model/subCategorySchema");
let path = require("path");
const fs = require("fs");


module.exports.addproduct = async (req , res ) => {
    try{
        const Category = await userCategory.find({});
        const SubCategory = await userSubCategory.find({})
        
        res.render("addProduct" , {Category,SubCategory})
    } catch (err) {
        console.log(err);
    }
}

module.exports.insserProduct = async (req , res) => {
    if (req.file) {
        req.body.ProductImage = req.file.path;
      } else {
        return res.status(400).send("CategoryImage is required.");
      }
    console.log(req.body);
    let data = await userProduct.create(req.body);
    data ? res.redirect("back") : console.log("Something went wrong");
}

module.exports.viewProduct = async (req ,res) => {
    const data = await userProduct.find({}).populate("Category").populate("subCategory")
    res.render("viewProduct", { data });
}