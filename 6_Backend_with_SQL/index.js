const { faker } = require("@faker-js/faker");
const mysql = require("mysql2"); //get client
const express = require("express");
const app = express();
const {v4:uuidv4} = require("uuid");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backend_sql",
    password: "siddhant",
});

let getRandomUser = () => {
    // return {     //return an object with key-value pair
    //     userId: faker.string.uuid(),
    //     username: faker.internet.username(),
    //     email: faker.internet.email(),
    //     password: faker.internet.password(),
    // };
    return [
        // return array
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

let data = [];

// for (let i = 0; i < 100; i++) {
//     data.push(getRandomUser());
// }

// let q1 = "show tables";

//inserting new data manually

// let q2 = "insert into users (id, username, email, password) values (?,?,?,?)";
let q3 = "insert into users (id, username, email, password) values ?";
// let userdata = [
//     ["123", "siddhant", "siddhant@abc.com", "siddhant"],
//     ["456", "rahul", "rahul@abc.com", "rahul"],
//     ["789", "sachin", "sachin@abc.com", "sachin"],
// ];

// try {
//     connection.query(q3, [data], (err, res) => {
//         if (err) throw err;
//         console.log(res);
//         // console.log(res.length);
//         // console.log(res[0]);
//         // console.log(res[1]);
//     });
// } catch (err) {
//     console.log(err);
// }

// connection.end();

// console.log(getRandomUser());


//home page
app.get("/", (req, res) => {
    let q = `select count(*) from users`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];  //"count(*)" = key
            res.render("home.ejs", { count });
        });
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});


//show user route
app.get("/users", (req, res) => {
    let q = `select * from users`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let users = result;
            res.render("showUsers.ejs", { users });
        })
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});

//edit route
app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `select * from users where id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            console.log(result);
            res.render("edit.ejs", { user });
        })
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});

//update route
app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let q = `select * from users where id = '${id}'`;
    let {username: newUsername, password : formPass} = req.body;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if(formPass!=user.password){
                res.send("incorrect password");
            }else{
                let q2 = `update users set username = '${newUsername}' where id = '${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/users");
                });
            }
        });
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});


//add new user 
app.get("/users/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/users/new",(req,res)=>{
    let {username,email,password} = req.body;
    let id = uuidv4();
    let q = `insert into users (id,username,email,password) values ('${id}','${username}','${email}','${password}')`;
    try{
        connection.query(q, (err,result)=>{
            if(err)throw err;
            console.log("added new user");
            res.redirect("/users");
        });
    }catch(err){
        res.send("some error occured");
        console.log(err);
    }
});

//delete route
app.get("/users/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `select * from users where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("delete.ejs", { user });
        });
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});

app.delete("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `select * from users where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (password != user.password) {
                res.send("incorrect password");
            } else {
                let q2 = `delete from users where id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    else {
                        console.log(result);
                        console.log("deleted");
                        res.redirect("/users");
                    }
                });
            }
        });
    } catch (err) {
        res.send("some error occured");
        console.log(err);
    }
});

app.listen(port, (req, res) => {
    console.log(`server is listening to port ${port}`);
});
