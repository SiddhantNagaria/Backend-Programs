const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat.js');
const Chat = require('./models/chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main().then(()=>{
    console.log('connected to MongoDB');
}).catch(err=>{
    console.log('Error connecting to MongoDB', err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
    from: "John",
    to: "Doe",
    msg: "Hello Doe",
    createdAt: new Date()
});

chat1.save().then((res)=>{
    console.log(res);
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8080, (req,res)=>{
    console.log("Server is running on port 8080");
})