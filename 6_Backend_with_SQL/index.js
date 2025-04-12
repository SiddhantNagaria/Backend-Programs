const { faker } = require("@faker-js/faker");
const mysql = require("mysql2"); //get client
const express = require("express");
const app = express();
const uuid = require("uuid");
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

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

app.listen(port, (req, res) => {
    console.log(`server is listening to port ${port}`);
});
