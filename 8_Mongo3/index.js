const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/Chat.js');
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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
});


//new route
app.get('/chats/new', (req, res) => {
    // throw new ExpressError(404, "Page not found");
    res.render('new.ejs');
})


//create route
app.post('/chats', asyncWrap(async (req, res, next) => {
    
        let { from, msg, to } = req.body;
        let newChat = new Chat({
            from: from,
            msg: msg,
            to: to,
            createdAt: new Date()
        });
        await newChat.save();
        res.redirect('/chats');
}));


function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=> next(err));
    }
}

//show route
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        next(new ExpressError(404, "chat not found"));
    }
    res.render("edit.ejs", { chat })
}));

//edit route
app.get('/chats/:id/edit', asyncWrap(async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render('edit.ejs', { chat });
    } catch (err) {
        next(err);
    }
}));


//update route
app.put('/chats/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg },
            { runValidators: true, new: true });
        console.log(updatedChat);
        res.redirect('/chats');
    } catch (err) {
        next(err);
    }
})


//delete route
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    console.log('Chat deleted successfully');
    res.redirect('/chats');

})

app.get("/", (req, res) => {
    res.send("Hello World!");
});


//Error Handler Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "some error occured" } = err;
    res.status(status).send(message);

})

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
})