const express = require("express");
const port = 7000;

const app = express();
const db = require("./config/Database");
const crudBooks = require("./model/crudSchema");

app.set("view engine" ,"ejs")

app.use(express.urlencoded())

app.get("/" , async (req , res) => {
    let BookData = await crudBooks.find({})
    BookData ? res.render("index" , {BookData}) : console.log("Book Not Found");    
})

app.post("/insert" , async (req , res) =>{
    console.log(req.body);
    let BookData = await crudBooks.create(req.body);
    BookData ? res.redirect("back") : console.log("Data not inserted");  
})

app.get("/deleteData" , async (req , res) => {
    let DeleteBook = await crudBooks.findByIdAndDelete(req.query.id);
    DeleteBook ? res.redirect("back") : console.log("Data not deleted"); 
})

app.get("/editData" , async (req , res) =>{
    let singleBook = await crudBooks.findById(req.query.id);
    singleBook ? res.render("edit" , {singleBook}) : console.log("Data not Found");
})

app.post("/updateData" , async (req , res) =>{
    console.log(req.body)
    let update = await crudBooks.findByIdAndUpdate(req.query.id , req.body)
    update ? res.redirect("/") : console.log("Data not updated");
})

app.listen(port , (err) =>{
    err ? console.log(err) : console.log(`Server Started on Port ${port}`);  
})