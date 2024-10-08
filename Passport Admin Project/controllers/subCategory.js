const UserSubCategory = require("../model/subCategorySchema");
let userCategory = require("../model/CategorySchema");

module.exports.addSubCategory = async (req, res) => {
  try {
    const categories = await userCategory.find({});

    res.render("addSubCategory", { data: categories });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.inssersubCategory = async (req, res) => {
  let data = await UserSubCategory.create(req.body);
  data ? res.redirect("back") : console.log("Something went wrong");
};

module.exports.viewSubCategory = async (req , res) => {
  try {
    const data = await UserSubCategory.find({}).populate("CategoryId");
    res.render("viewSubCategory", { data });
  } catch (err) {
    console.log(err);
  }
}


