const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  company : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  phone : {
    type : Number,
    required : true
  },
  massage : {
    type : String,
    required : true
  },
  img : {
    type : String,
    required : true,
  }
});

const UserModel = mongoose.model("data", userSchema);

module.exports = UserModel;
