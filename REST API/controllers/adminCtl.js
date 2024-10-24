const UserModel = require("../models/adminSchema");
const bcryptjs = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const mailer = require("../config/Mailer");
const bcrypt = require("bcryptjs");
const manager = require('../models/manager');
const employe = require('../models/employe')

module.exports.addAdmin = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(200).json({ msg: "User Already Existed" });
  }
  req.body.password = await bcryptjs.hash(req.body.password, 10);
  req.body.creatAt = moment().format("MMMM Do YYYY , h:mm:ss a");
  let data = await UserModel.create(req.body);
  console.log(req.body);
};

module.exports.loginAdmin = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(user);

  if (user) {
    if (await bcryptjs.compare(req.body.password, user.password)) {
      let token = jwt.sign({ userData: user }, "node", { expiresIn: "1h" });
      return res.status(200).json({ msg: "Login Successfull", token: token });
    } else {
      res.status(200).json({ msg: "Invalid Password" });
    }
  } else {
    res.status(400).json({ msg: "User Not Found" });
  }
};

module.exports.viewAdmin = async (req, res) => {
  let data = await UserModel.find({});
  res.status(200).json({ adminData: data });
};

module.exports.changePassword = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid Password" });
  }
  const newPass = await bcryptjs.hash(req.body.newpassword, 10);
  user.password = newPass;
  await user.save();
  res.status(200).json({ msg: "Password Changed Successfully" });
};

module.exports.forgetPassword = async (req, res) => {
  console.log(req.body);
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  let otp = Math.floor(Math.random() * 9000 + 1000);
  mailer.sendOtp(req.body.email, otp);
  req.session.otp = otp;
  req.session.adminId = user.id;
  res.status(200).json({ msg: "OTP sent to your email" });
};

module.exports.verifyOtp = async (req, res) => {
  const otp = req.body.otp;
  const newpassword = req.body.newpassword;
  const confirmpassword = req.body.confirmpassword;

  let adminId = req.session.adminId;
  console.log(req.session.otp);
  console.log(req.body);

  if (req.session.otp == otp) {
    if (newpassword == confirmpassword) {
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      (await UserModel.findByIdAndUpdate(adminId, {
        password: hashedPassword,
      })) && res.status(200).json({ msg: "Password updated successfully" });
    } else {
      return res
        .status(400)
        .json({ msg: "new paasword and confirmpassword is same" });
    }
  } else {
    return res.status(400).json({ msg: "Invalid OTP" });
  }
};

module.exports.addmanager = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let data = await manager.create(req.body);
  data
    ? res.status(200).json({ msg: "manager created" })
    : res.status(404).json({ msg: "manager not add" });
  console.log(req.body);
};

module.exports.logmanager = async (req, res) => {
  let user = await manager.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let token = jwt.sign({ userdata: user }, "node", { expiresIn: "1h" });
      console.log(token);
      res.status(200).json({ msg: "login scuccessfully", token: token });
    } else {
      res.status(404).json({ msg: "password not match" });
    }
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};

module.exports.viewmanager = async (req, res) => {
  let data = await manager.find({});
  data
    ? res
        .status(200)
        .json({ msg: "data sent scuccessfully", managerdata: data })
    : res.status(404).json({ msg: "error for sendin data" });
};

module.exports.deletemanager = async (req, res) => {
  try {
    await manager.findByIdAndDelete(req.query.id);
    res.status(200).json({ msg: "manager deleted" });
  } catch (err) {
    res.status(404).json({ msg: "manager not deleted" });
  }
};

module.exports.logemploye = async (req, res) => {
  let user = await employe.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let token = jwt.sign({ userdata: user }, "node", { expiresIn: "1h" });
      console.log(token);
      res.status(200).json({ msg: "login scuccessfully", token: token });
    } else {
      res.status(404).json({ msg: "password not match" });
    }
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};

module.exports.viewemploye = async(req,res)=>{
  let data = await employe.find({});
  data ? res.status(200).json({ msg: 'data sent scuccessfully', employedata: data }) : res.status(404).json({ msg: 'error for sendin data' })   
}
module.exports.deletemploye = async(req,res)=>{
  try{
      await manager.findByIdAndDelete(req.query.id);
  res.status(200).json({msg : "manager deleted"})
  }catch(err){
      res.status(404).json({msg : "manager not deleted"})

  }
}