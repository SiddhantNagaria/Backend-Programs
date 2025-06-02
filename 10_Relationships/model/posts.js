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
    usename: String,
    email: String,
});

const postSchema = new Schema({
    content:String,
    likes:Number,
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async()=>{
//     let user1 = new User({
//         username:"siddhant",
//         email:"siddhant@abc.com"
//     });
//     let post1 = new Post({
//         content:"Hello world",
//         likes:7,
//     });
//     post1.user = user1;
//     await user1.save();
//     await post1.save();
// }

// addData();

let getData = async()=>{
    let result = await Post.findOne({}).populate("user","username");
    console.log(result);
}

getData();