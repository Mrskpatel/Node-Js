const express = require("express");
const route = express.Router();
const Categoryctl = require('../controllers/CategoryCtl')
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
  
  const Uploadspic = multer({ storage: Storage }).single("CategoryImage");

route.get("/addCategory", passport.checkauth , Categoryctl.addCategory);
route.get("/viewCategory", passport.checkauth , Categoryctl.viewCategory);
route.get("/deleteCategory", Categoryctl.deleteCategory);
route.get("/editCategory",passport.checkauth, Categoryctl.editCategory);

route.post("/insserCategory" , Uploadspic , passport.checkauth , Categoryctl.insserCategory);
route.post("/updateCategory",Uploadspic,passport.checkauth, Categoryctl.updateCategory);
module.exports = route;