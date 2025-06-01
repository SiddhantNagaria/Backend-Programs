const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/Relations_SQL");
}

main()
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

const userSchema = new Schema({
    username: String,
    Address: [
        {
            _id: false,
            location: String,
            City: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);


//One to Many - approach 1 => One to Few
const addUsers = async () => {
    let user1 = new User({
        username: "Siddhant",
        Address: [
            {
                location: "street 1232",
                City: "jhansi",
            },
        ],
    });
    user1.Address.push({ location: "street 342", City: "noida" });
    let res = await user1.save();
    console.log(res);
};

addUsers();
