const mongoose=require('mongoose')

const AdminLoginSchema=mongoose.Schema({

  username : {
    type : String,
    required : true,
  },
  email  : {
    type : String,
    required : true,
    unique :true,
  },
  password : {
    type : String,
    required : true,
  },
  charAt : {
    type : String,
    required : true,
  }
})

const AdminLogModel=mongoose.model("Admin-Log",AdminLoginSchema);

module.exports=AdminLogModel;