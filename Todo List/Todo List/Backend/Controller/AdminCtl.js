const AdminLogModel=require('../Models/AdminLoginSchema');
const AdminModel=require('../Models/AdminSchema');
const moment=require('moment');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

module.exports.Registration=async(req,res)=>{
  try{
     req.body.password=await bcrypt.hash(req.body.password,10);
     
     req.body.charAt=moment(Date.now()).toString();
  
     const registerdata=await AdminLogModel.create(req.body);
      
     
     res.status(200).json({msg : "Create data Successfully...",registerdata});
  }
  catch(err){
    console.log(err);
    
  }
}

module.exports.loginadmin=async(req,res)=>{
  try{
    console.log(req.body)
   const user=await AdminLogModel.findOne({email : req.body.email});
   console.log(user)
   if(user){
      if(await bcrypt.compare(req.body.password,user.password)){
         const token=jwt.sign({userdata : user},"node",{expiresIn : "1h"});
         res.status(200).json({msg : `Login Successfully By ${user.username}`,token:token})
      }
      else {
        res.status(404).json({msg : "Wrongh Password Please Try Again...!!"})

      }
   }
   else {
    res.status(404).json({msg : "Admin Not Found..."})
   }
  }
  catch {
   console.log("Login failed...");
   
  }
}

module.exports.forgetpass=async(req,res)=>{
  const user=await AdminLogModel.findOne({email : req.body.email});

  

}

module.exports.viewAdmin=async(req,res)=>{
  try{
     const admindata=await AdminModel.find({})
     res.json(admindata);

  }
  catch (err){
    console.log(err)
  }
}
module.exports.insertadmin=async(req,res)=>{
  try {
    req.body.password=await bcrypt.hash(req.body.password,10);
    req.body.charAt=await  moment(Date.now()).toString();
    
    const insertdata=await AdminModel.create(req.body)

     res.json(insertdata)
  }
  catch(err) {
    res.status(404).json(err)
  }
}

module.exports.deleteadmin=async(req,res)=>{
  try {
    const deletedata=await AdminModel.findByIdAndDelete(req.query.id);

    deletedata ? res.status(202).json({msg : "Admin Delete Successfully...",deletedata}) :
    res.status(404).json({msg : "Admin Not Deleted Try again...!!!"})
    
  }
  catch(err){
    res.status(404).json(err)
  }
}