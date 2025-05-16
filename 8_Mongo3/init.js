const mongoose = require('mongoose');
const Chat = require('./models/Chat.js');

main().then(() => {
    console.log('connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "John",
        to: "Doe",
        msg: "Hello Doe",
        createdAt: new Date()
    },
    {
        from: "Doe",
        to: "John",
        msg: "Hello John",
        createdAt: new Date()
    },
    {
        from: "John",
        to: "Doe",
        msg: "How are you?",
        createdAt: new Date()
    },
]

Chat.insertMany(allChats);
