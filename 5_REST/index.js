const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "siddhant",
        content: "I do coding",
    },
    {
        id: uuidv4(),
        username: "rahul",
        content: "I do video editing",
    },
];


//index route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//create route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content }); //push as object
    res.redirect("/posts");
})

//show route
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

//update route
app.patch("/posts/:id", (req, res) => {
    //use postman or hopscotch to run this request
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

//edit route
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});


//delete route
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
