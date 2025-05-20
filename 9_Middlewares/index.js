const express = require('express');
const app = express();

//middleware
app.use((req, res, next) => {
    console.log('hi , i am first middleware');
    return next();
    console.log('abc');
})

app.use((req, res, next) => {
    console.log('hi , i am second middleware');
    next();
})


//utility middleware
app.use((req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
})

app.get("/", (req, res) => {
    res.send("hi i am root");
})

app.get("/random", (req, res) => {
    res.send("hi, i am random page");
})

//404
app.use((req,res)=>{
    res.status(404).send("page not found");
})

app.listen(8080, () => {
    console.log('server running on port 8080');
})