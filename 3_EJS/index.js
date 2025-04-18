const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//serve static files
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

//EJS

app.get("/rolldice", (req, res) => {
  //assume this value coming from a database
  // which is sent to ejs file as object
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { num: diceVal });
});

app.get("/ig/:username", (req, res) => {
  const followers = ["adam", "bob", "steve"];
  let { username } = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  if (data) {
    res.render("ig.ejs", { followers, data });
  } else {
    res.render("error.ejs");
  }
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
