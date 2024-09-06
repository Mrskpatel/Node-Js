const express = require('express');
const routes = express.Router();
const multer = require("multer");
const adminCtl = require('../controller/adminCtl')

const Storage = multer.diskStorage({
     destination : (req,file,cb) =>{
        cb(null,"uploads");
     },
     filename : (req,file,cb) =>{
        cb(null,file.fieldname+"-"+Date.now());
     }
})

const uploadspic=multer({storage:Storage}).single("image")

routes.get('/' , adminCtl.index)
routes.get('/AddMovie' , adminCtl.addMovie)
routes.post('/insertMovie',uploadspic,adminCtl.insertMovie);

routes.get('/deleteMovie',adminCtl.deletedata);
routes.post('/editMovie',adminCtl.editMovie);
routes.get("/editMovie",adminCtl.editMovie)
routes.post("/updateMovie",uploadspic,adminCtl.updataMovie)
module.exports = routes