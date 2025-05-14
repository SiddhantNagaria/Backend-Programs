const mongoose = require('mongoose');

main() //promises - callback
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema); //model and collection name should be same
 //   |                        |
  //model                 //collection
const Employee = mongoose.model('Employee', userSchema);