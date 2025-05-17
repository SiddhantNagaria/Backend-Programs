const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/Chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log('connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render('index', { chats });
})


//new route
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
})

//create route
app.post('/chats', (req, res) => {
    const { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        createdAt: new Date()
    });
    newChat.save().then((res) => {
        console.log('Chat saved successfully');
    }).catch((err) => {
        console.log('Error saving chat', err);
    });
    res.redirect('/chats');
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
})