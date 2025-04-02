const express= require('express');
const app = express();
const port = 3000;


app.get('/register', (req, res) => {
    let {user,password} = req.query;
    res.send(`Standard GET Response ! Welcome ${user}`);
}); 

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Standard POST Response !');
}); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});