const { log } = require("console");
const movieTbl = require("../model/schemaMovie");
const fs = require("fs");
const path = require("path");

module.exports.index = async (req, res) => {
  const MovieData = await movieTbl.find({});
  MovieData
    ? res.render("index", { MovieData })
    : console.log("Data not found");
};

module.exports.addMovie = async (req, res) => {
  res.render("addMovie");
};

module.exports.insertMovie = async (req, res) => {
  try {
    req.body.image = req.file.path;

    const MovieData = await movieTbl.create(req.body);
    console.log(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.deletedata = async (req, res) => {
  try {

    const singledata=await movieTbl.findById(req.query.id)

    const imgpath =path.join(__dirname,"..",singledata.image)

    fs.unlinkSync(singledata.image);

    const deldata = await movieTbl.findByIdAndDelete(req.query.id);
    deldata ? res.redirect("back"): console.log("something wrong");
    
  } catch (err) {
    console.log(err);
  }
};

module.exports.editMovie = async (req , res) => {
  try{
    const editData = await movieTbl.findById(req.query.id);
    editData ? res.render("editMovie",{editData}) : console.log("data not found");

  }catch(err){
    console.log (err);
  }
}

module.exports.updataMovie = async (req , res) => {
  try{
      console.log(req.file);
      
     let img=""
     let singledata=await movieTbl.findById(req.query.id)

     req.file ? img= req.file.path : img=singledata.image;

     if(req.file){
      fs.unlinkSync(singledata.image)

     }
     req.body.image=img;
     
     const updatedata =await movieTbl.findByIdAndUpdate(req.query.id,req.body)

     res.redirect("/")
  }catch(err){
    console.log(err);
    
  }
}