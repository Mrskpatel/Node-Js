const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema({

  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  phoneno : {
    type : String,
    required : true,
  },
  charAt :{ 
    type :String,
    required : true,
  }

})

const AdminModel=mongoose.model("Admin-api",AdminSchema);

module.exports=AdminModel;