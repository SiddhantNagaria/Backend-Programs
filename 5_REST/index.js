const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

let posts = [
    {
        username: "siddhant",
        content: "I do coding",
    },
    {
        username: "rahul",
        content: "I do video editing",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
