const mongoose = require('mongoose');

main() //promises - callback
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}