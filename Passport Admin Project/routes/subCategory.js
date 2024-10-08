const express = require("express");
const route = express.Router();
const subCategory = require("../controllers/subCategory");
const multer = require("multer");
const passport = require("passport");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/Category/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  
  const Uploadspic = multer({ storage: Storage }).single("subCategoryImage");

route.get("/addSubCategory" , passport.checkauth , subCategory.addSubCategory);
route.post("/inssersubCategory" , passport.checkauth , subCategory.inssersubCategory);
route.get("/viewSubCategory" , passport.checkauth , subCategory.viewSubCategory);

module.exports = route;