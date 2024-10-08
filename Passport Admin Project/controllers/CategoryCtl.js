const UserCategory = require("../model/CategorySchema");
let path = require("path");
const fs = require("fs");

module.exports.addCategory = (req, res) => {
  res.render("addCategory");
};

module.exports.insserCategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.CategoryImage = req.file.path;
    } else {
      return res.status(400).send("CategoryImage is required.");
    }
    const data = await UserCategory.create(req.body);
    console.log(data);
    res.redirect("viewCategory");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.viewCategory = async (req, res) => {
  try {
    const data = await UserCategory.find({});
    res.render("viewCategory", { data });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const singaldata=await UserCategory.findById(req.query.id)
    const imagepath=path.join(__dirname,"..",singaldata.CategoryImage);
if(singaldata)
{
  fs.unlinkSync(singaldata.CategoryImage);
}
const data = await UserCategory.findByIdAndDelete(req.query.id);

    data ? res.redirect("back") : console.log("Can't delete data");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.editCategory = async (req, res) => {
  try {
    const editdata = await UserCategory.findById(req.query.id);
    res.render("editCategory", { editCategory: editdata });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.updateCategory = async (req, res) => {
  try {
    let image = "";

    const singledata = await UserCategory.findById(req.query.id);

    req.file ? (image = req.file.path) : (img = singledata.img);

    if (req.file) {
      fs.unlinkSync(singledata.img);
    }

    req.body.img = image;

    const updatedata = await UserCategory.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res.redirect("viewCategory");
  } catch (err) {
    console.log(err);
  }
};