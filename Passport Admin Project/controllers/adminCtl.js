const UserModel = require("../model/AdminSchema");
let path = require("path");
const fs = require("fs");
const mailer = require("../config/mailer");

module.exports.Login = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};

module.exports.dashboard = (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    console.log(err);
  }
};

module.exports.AddForm = (req, res) => {
  try {
    res.render("AddForm");
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
    let user = await UserModel.findOne({ email: req.body.email });

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
  req.session.destroy();
  res.redirect("/");
};

module.exports.changePassword = (req, res) => {
  res.render("ChangePassword");
};

module.exports.newPassword = async (req, res) => {
  let adminData = await UserModel.findById(req.user.id);
  if (adminData) {
    if (req.body.oldpass == adminData.password) {
      if (req.body.oldpass != req.body.newPass) {
        if (req.body.newPass == req.body.confirmpass) {
          let newPassword = await UserModel.findByIdAndUpdate(adminData.id, {
            password: req.body.newPass,
          });
          newPassword
            ? res.redirect("/logout")
            : console.log("PassWord is not Change");
        } else {
          console.log("New Password and confirm password are different");
          res.redirect("/changePassword");
        }
      } else {
        console.log("Old Password and New Password Must Be Different");
        res.redirect("/changePassword");
      }
    } else {
      console.log("Old Password Is Wrong");
      res.redirect("/changePassword");
    }
  } else {
    console.log("Admin Not Found");
    res.redirect("/changePassword");
  }
};

module.exports.profile = (req, res) => {
  res.render("Profile");
};

module.exports.forgotPassword = (req, res) => {
  res.render("ForgotPassword");
};

module.exports.forgotPass = async (req, res) => {
  let adminData = await UserModel.findOne({ email: req.body.email });
  if (!adminData) {
    return res.render("ForgotPassword");
  }

  let otp = Math.floor(Math.random() * 100000 + 900000);

  mailer.sendOtp(req.body.email, otp);
  req.session.otp = otp;
  
  req.session.adminId = adminData.id;

  res.render("NewSetPassword");
};


module.exports.checkOtp = (req, res) => {
  try {
    let otp = req.session.otp;
    let adminId = req.session.adminId;

    if (req.body.otp == otp) {
      res.render("NewPassword");
    } else {
      console.log("Invalid OTP");
      res.redirect("ForgotPassword");
    }
  } catch (err) {
    console.log("Error verifying OTP:", err);
    res.redirect("ForgotPassword");
  }
};

module.exports.newChangePassword = async (req, res) => {
  try {
    if (!req.session.adminId) {
      console.log("Admin ID not found in session");
      return res.redirect("/newPassword"); 
    }
    
    if (req.body.newPass !== req.body.confirmPass) {
      console.log("New password and confirm password do not match");
      return res.redirect("/newPassword"); 
    }

    let changeAuth = await UserModel.findByIdAndUpdate(req.session.adminId, {
      password: req.body.newPass,
    });

    if (changeAuth) {
      res.redirect("/");
    } else {
      console.log("Failed to update the password");
      res.redirect("/newPassword"); 
    }
  } catch (err) {
    console.log("Error during password change:", err);
    res.redirect("/newPassword"); 
  }
};
