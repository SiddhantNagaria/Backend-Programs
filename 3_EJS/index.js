const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
