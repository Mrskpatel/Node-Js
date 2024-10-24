const express = require("express");
const routes = express.Router();
const adminCtl = require("../controllers/adminCtl");
const adminAuth = require("../config/AdminAuth");

routes.post("/addAdmin" , adminCtl.addAdmin);
routes.post("/loginAdmin" , adminCtl.loginAdmin);
routes.get("/viewAdmin" , adminAuth , adminCtl.viewAdmin);
routes.post("/changePassword" , adminAuth , adminCtl.changePassword);
routes.post("/forgetPassword" , adminAuth , adminCtl.forgetPassword);
routes.post("/verifyOtp",adminCtl.verifyOtp);
routes.post("/addmanager",adminCtl.addmanager);
routes.get("/viewadmin",adminCtl.viewmanager)
routes.post("/logmanager",adminCtl.logmanager);
routes.delete("/deletemanager",adminCtl.deletemanager)

module.exports = routes