const UserModel = require("../model/AdminSchema");
let path = require("path");
const fs = require("fs");

module.exports.Login = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};

module.exports.dashboard = (req, res) => {
  try {
    res.render("dashboard" ,{
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.AddForm = (req, res) => {
  try {
    res.render("AddForm",{
      
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.insserdata = async (req, res) => {
  try {
    req.body.img = req.file.path;
    const data = await UserModel.create(req.body);
    console.log(req.body);
    res.redirect("/ViewForm");
  } catch (err) {
    console.log(err);
  }
};

module.exports.deletedata = async (req, res) => {
  try {
    const singledata = await UserModel.findById(req.query.id);
    fs.unlinkSync(singledata.img);
    const deldata = await UserModel.findByIdAndDelete(req.query.id);
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

module.exports.editdata = async (req, res) => {
  try {
    const editdata = await UserModel.findById(req.query.id);
    res.render("EditForm", { editdata });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updatedata = async (req, res) => {
  try {
    let image = "";

    const singledata = await UserModel.findById(req.query.id);

    req.file ? (image = req.file.path) : (img = singledata.img);

    if (req.file) {
      fs.unlinkSync(singledata.img);
    }

    req.body.img = image;

    const updatedata = await UserModel.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res.redirect("/ViewForm");
  } catch (err) {
    console.log(err);
  }
};

module.exports.ViewForm = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.render("ViewForm", { data });
  } catch (err) {
    console.log(err);
  }
};

module.exports.userlogin = async (req, res) => {
  try {
    console.log(req.body);
    let user = await UserModel.findOne({ email: req.body.email });

    console.log(user);

    if (user) {
      if (user.password == req.body.password) {
        return res.redirect("/dashboard");
      } else {
        console.log("Incorrect password");
        res.redirect("/");
      }
    } else {
      console.log("User not found");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.Logout = (req, res) => {
  res.redirect("/");
};
