const express = require("express");
const db = require("./config/db");
const crudschema = require("./model/crudschema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const port = 3000;
const app = express();

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const uploadpic = multer({
    storage: Storage,
}).single("image");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        let data = await crudschema.find({});
        res.render("index", { data });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/insert", uploadpic, async (req, res) => {
    try {
        req.body.image = req.file.path;
        await crudschema.create(req.body);
        res.redirect("back");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/deleteData", async (req, res) => {
    try {
        let singledata = await crudschema.findById(req.query.id);
        if (singledata) {
            fs.unlinkSync(singledata.image);
            await crudschema.findByIdAndDelete(req.query.id);
            res.redirect("back");
        } else {
            console.error("Data not found for deletion");
            res.status(404).send("Not Found");
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/editData", async (req, res) => {
    try {
        let editschema = await crudschema.findById(req.query.id);
        res.render("edit", { editschema });
    } catch (error) {
        console.error("Error fetching data for edit:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/updateData", uploadpic, async (req, res) => {
    try {
        let img = "";
        let singledata = await crudschema.findById(req.query.id);
        if (req.file) {
            img = req.file.path;
            fs.unlinkSync(singledata.image);
        } else {
            img = singledata.image;
        }
        req.body.image = img;
        await crudschema.findByIdAndUpdate(req.query.id, req.body);
        res.redirect("/");
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Server started on http://localhost:${port}`);
    }
});
