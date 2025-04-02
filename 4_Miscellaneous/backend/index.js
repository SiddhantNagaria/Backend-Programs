const express= require('express');
const app = express();
const port = 3000;


// Middleware to parse JSON body
app.use(express.json());

// Middleware to parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
    let {user,password} = req.query;
    res.send(`Standard GET Response ! Welcome ${user}`);
}); 

app.post('/register', (req, res) => {
    let {user,password} = req.body;
    console.log(req.body);
    res.send(`Standard POST Response !  Welcome ${user}`);
}); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});