const express = require('express');
const app = express();

//middleware
app.use((req,res)=>{
    // console.log("path", req.path);
    if (req.path === '/favicon.ico') {
        return res.status(204).end(); // No Content
    }
    let {query} = req.query;
    console.log(query);
    console.log('hi , i am a middleware');
    res.send("middleware finished");
})

app.get("/", (req,res)=>{
    res.send("hi i am root");
})

app.get("/random", (req,res)=>{
    res.send("hi, i am random page")
})

app.listen(8080, ()=>{
    console.log('server running on port 8080');
})