const express = require("express");
const port = 1083;
const db = require("./config/Database");
const path = require("path");
const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");
var session = require("express-session");
const passport = require("passport");
const localst = require("./config/Passport");

app.use(
  session({
    name: "demo",
    secret: "keyboard",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthuser);

const routes = require("./routes");
app.use("/", routes);
const route = require("./routes/Category");
const SubRoute = require("./routes/subCategory");
const ProductRoute = require("./routes/Product");

app.use("/Category", route);
app.use("/subCategory", SubRoute);
app.use("/Product", ProductRoute);

app.use(express.static(path.join(__dirname, "Public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/Category",express.static(path.join(__dirname, "uploads/Category")));
app.use("/uploads/Product",express.static(path.join(__dirname, "uploads/Product")));

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server is running on port " + port);
});
