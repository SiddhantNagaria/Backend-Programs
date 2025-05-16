const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/Chat.js');
const Chat = require('./models/Chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main().then(()=>{
    console.log('connected to MongoDB');
}).catch(err=>{
    console.log('Error connecting to MongoDB', err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get('/chats', async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render('index', {chats});
})


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8080, (req,res)=>{
    console.log("Server is running on port 8080");
})