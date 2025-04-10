const { faker } = require("@faker-js/faker");
const mysql = require("mysql2"); //get client

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backend_sql",
    password: "sknagaria",
});

try {
    connection.query("SHOW TABLES", (err, res) => {
        if (err) throw err;
        console.log(res);
    });
} catch (err) {
    console.log(err);
};

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