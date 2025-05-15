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

const user1 = new User({ username: "abc", email: "abc@abc", password: "abc" });
const user2 = new User({ username: "xyz", email: "xyz@xyz", password: "xyz" });
user1.save();  //asynchronous
user2.save().then(
    (res) => { console.log(res) }
).catch(
    (err) => {
        console.log(err);
    });

User.insertMany([
    { username: "pqr", email: "pqr@pqr", password: "pqr" },
    { username: "lmn", email: "lmn@lmn", password: "lmn" }
]).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err);
});

User.find().then((res) => {
    console.log(res);
    // console.log(res[0].username);
}).catch((err) => {
    console.log(err);
});

User.findOne({ username: "abc" }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

User.findById("6825a5d6cbed6e0da7df4a6c").then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

User.updateOne({ username: "abc" }, { email: "abc@xyz" }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

User.updateMany({ username: "abc" }, { email: "abc@pqr" }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

User.findOneAndUpdate({ username: "abc" }, { email: "abc@pqr" }, { new: true }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

User.findByIdAndUpdate("6825a5d6cbed6e0da7df4a6c", { email: "abc@asdf" }, { new: true }).then((res) => {
    console.log(res);
}).catch(err => console.log(err));