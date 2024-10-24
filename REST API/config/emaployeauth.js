const admin = require("../models/adminSchema")
const manager = require('../models/manager')
const employe = require("../models/employe")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    let token = req.header("Authorization");
    if(!token){
        return res.status(400).json({msg : "unauthorize user"});
        
    }
    let newtoken = token.slice(7,token.length);
    let decode = jwt.verify(newtoken,"node");

    let man = await employe.findById(decode.employedata._id)
    if(!man){
        return res.status(400).json({msg:"invalid employe"})
    }

    req.user = decode;
    
    next();
}

module.exports = auth;