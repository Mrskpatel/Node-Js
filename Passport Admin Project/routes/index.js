const express = require("express");
const routes = express.Router();
const adminCtl = require("../controllers/adminCtl");
const multer = require("multer");
const passport = require("passport");

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
routes.get("/deletedata",passport.checkauth, adminCtl.deletedata);
routes.get("/editdata",passport.checkauth, adminCtl.editdata);
routes.get("/changePassword",passport.checkauth,adminCtl.changePassword);
routes.get("/profile",passport.checkauth,adminCtl.profile);
routes.get("/forgotPassword",adminCtl.forgotPassword);
routes.get("/logout",adminCtl.Logout)

routes.post("/insserdata" ,passport.checkauth,Uploadspic, adminCtl.insserdata);
routes.post("/updatedata",passport.checkauth,Uploadspic, adminCtl.updatedata);
routes.post("/newPassword",passport.checkauth,adminCtl.newPassword);
routes.post("/forgotPass",adminCtl.forgotPass);
routes.post("/checkOtp",adminCtl.checkOtp);
routes.post("/newChangePassword",adminCtl.newChangePassword);
routes.post("/userlogin",passport.authenticate("local",{failureRedirect:"/"}),adminCtl.userlogin);

module.exports = routes;