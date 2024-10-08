const express = require("express");
const routes = express.Router();
const ProductCtl = require("../controllers/ProductCtl");
const multer = require("multer");
const passport = require("passport");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/Product");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  
const Uploadspic = multer({ storage: Storage }).single("ProductImage");

routes.get("/addProduct" , passport.checkauth , ProductCtl.addproduct);
routes.get("/viewProduct" , passport.checkauth, ProductCtl.viewProduct);

routes.post("/insserProduct" , Uploadspic , passport.checkauth , ProductCtl.insserProduct);

module.exports = routes;