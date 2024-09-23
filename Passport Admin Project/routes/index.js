const express = require("express");
const routes = express.Router();
const adminCtl = require("../controllers/adminCtl");
const multer = require("multer");
const passport = require("passport")

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const Uploadspic = multer({ storage: Storage }).single("img");

routes.get("/", adminCtl.Login);
routes.get("/dashboard",passport.checkauth, adminCtl.dashboard);
routes.get("/AddForm",passport.checkauth, adminCtl.AddForm);
routes.get("/ViewForm",passport.checkauth, adminCtl.ViewForm);

routes.post("/insserdata" ,passport.checkauth,Uploadspic, adminCtl.insserdata);
routes.get("/deletedata",passport.checkauth, adminCtl.deletedata);
routes.get("/editdata",passport.checkauth, adminCtl.editdata);
routes.post("/updatedata",passport.checkauth,Uploadspic, adminCtl.updatedata);

routes.post("/userlogin",passport.authenticate("local",{failureRedirect:"/"}),adminCtl.userlogin);
routes.get("/logout",adminCtl.Logout)

module.exports = routes;