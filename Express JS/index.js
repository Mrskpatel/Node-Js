const express = require("express");
const port = 7000;

const app = express();
const db = require("./config/Database")
const crudSchema = require('./model/crudSchema')

app.use(express.urlencoded());

app.set("view engine" ,"ejs")

app.get("/", async (req , res) =>{
    let data = await crudSchema.find({})
    data ? res.render("index" , {data}) : console.log("Data not Found");
})

app.post("/insert" , async (req , res)=>{
    console.log(req.body);
    let data = await crudSchema.create(req.body);
    data ? res.redirect("back") : console.log("data not inserted");
})

app.get("/deleteData" , async (req , res)=>{
    let deleteData = await crudSchema.findByIdAndDelete(req.query.id);
    deleteData ? res.redirect("back") : console.log("Data not deleted");  
})

app.get("/editData" , async (req , res) =>{
    let singleData = await crudSchema.findById(req.query.id);
    singleData ? res.render("edit" , {singleData}) : console.log("Data not Found");
})

app.post("/updateData" , async (req , res) =>{
    console.log(req.body)
    let update = await crudSchema.findByIdAndUpdate(req.query.id , req.body)
    update ? res.redirect("/") : console.log("Data not updated");
})

app.listen(port ,(err)=>{
    err ? console.log(err) : console.log(`Server Started On Port ${port}`);
})