const express = require("express");
const port = 7000;
const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.set("view engine", "ejs");

let studentdata = [
  {
    id: 1,
    name: "Sarthi",
  },
  {
    id: 2,
    name: "Raj",
  },
  {
    id: 3,
    name: "Prem",
  },
];

const middleware = async (req, resp, next) => {
  if (req.query.age >= 18) {
    next();
  } else {
    resp.redirect("/");
  }
};

app.get("/", (req, resp) => {
  resp.render("index", { studentdata });
});

app.post("/showdata", (req, resp) => {
  const { id, name } = req.body;
  let student_obj = {
    id: id,
    name: name,
  };
  studentdata.push(student_obj);
  resp.redirect("/");
});

app.get("/deletedata", (req, resp) => {
  const id = req.query.userid;

  const data = studentdata.filter((el, i) => {
    return el.id != id;
  });
  studentdata = data;
  resp.redirect("back");
});

app.get("/editdata", (req, resp) => {
  const id = req.query.editid;

  const data = studentdata.find((el) => el.id == id);

  resp.render("edit", {
    data,
  });
});

app.post("/updatedata", (req, resp) => {
  const { id, name } = req.body;

  const student_id = parseInt(id, 10); 

  const student = studentdata.find((el) => el.id === student_id);

  if (student) {
    student.name = name;
  }
  resp.redirect("/");
});

app.get("/home", middleware, (req, resp) => {
  resp.render("home");
});

app.get("/admin", (req, resp) => {
  resp.render("admin");
});

app.get("/registar", (req, resp) => {
  resp.render("registar");
});

app.use(middleware);
app.listen(port, console.log(`Server Started by port ${port} .....`));
