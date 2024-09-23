const express = require("express");
const port = 1080;
const db = require("./config/Database");
const path = require("path");
const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");
var session = require('express-session');
const passport = require("passport");
const localst = require("./config/Passport");

app.use(session({
  name : "demo",
  secret: 'keyboard',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge : 100 * 100 * 60}
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthuser)

const routes = require("./routes");
app.use("/", routes);

app.use(express.static(path.join(__dirname, "Public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server is running on port " + port);
});
