const express = require("express");
const port = 1080;

const app = express();
const db = require("./config/Database");
const adminSchema = require("./models/adminSchema");
const session = require("express-session");

app.use(
  session({
    name: "demo",
    secret: "keyboard",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 },
  })
);

app.use(express.urlencoded());
app.use("/", require("./routes/index"));
app.use('/manager',require("./routes/manager"))
app.use('/employe',require("./routes/employe"))

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server is running on port " + port);
});
