const { faker } = require("@faker-js/faker");
const mysql = require("mysql2"); //get client

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backend_sql",
    password: "sknagaria",
});

let q1 = "show tables";


//inserting new data manually

let q2 = "insert into users (id, username, email, password) values (?,?,?,?)";
let q3 = "insert into users (id, username, email, password) values ?";
let userdata = [
    ["123", "siddhant", "siddhant@abc.com", "siddhant"],
    ["456", "rahul", "rahul@abc.com", "rahul"],
    ["789", "sachin", "sachin@abc.com", "sachin"],
];

try {
    connection.query(q3, [userdata], (err, res) => {
        if (err) throw err;
        console.log(res);
        // console.log(res.length);
        // console.log(res[0]);
        // console.log(res[1]);
    });
} catch (err) {
    console.log(err);
}

connection.end();

let getRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

// console.log(getRandomUser());