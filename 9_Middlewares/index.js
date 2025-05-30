const express = require('express');
const app = express();
const ExpressError = require("./ExpressError");

//middleware
// app.use((req, res, next) => {
//     console.log('hi , i am first middleware');
//     return next();
//     console.log('abc');
// })

// app.use((req, res, next) => {
//     console.log('hi , i am second middleware');
//     next();
// })


//utility middleware
// app.use((req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// })

// app.get("/", (req, res) => {
//     res.send("hi i am root");
// })

// app.get("/random", (req, res) => {
//     res.send("hi, i am random page");
// })

// app.use("/api", (req, res, next) => {
//     let { token } = req.query;
//     if (token == "access") {
//         next();
//     }
//     res.send("access denied");
// })
// app.get("/api", (req, res) => {
//     res.send("data");
// })


//multiple middleware passing in one
const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token == "access") {
        next();
    }
    throw new ExpressError(401, "access denied");
};
app.get("/api", checkToken, (req, res) => {
    res.send("data");
})


//error handling
app.get("/wrong", (req, res) => {
    abcd = abcd;
})

app.get("/admin", (req,res)=>{
    throw new ExpressError(403, "admin access is forbidden");
})


app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error OCcured" } = err;
    // console.log("----- Error ----");
    res.status(status).send(message);
})

// app.use((err,req,res,next)=>{
//     console.log("----- Error 2 ----");
//     next(err);
// })

//404
// app.use((req, res) => {
//     res.status(404).send("page not found");
// })


app.listen(8080, () => {
    console.log('server running on port 8080');
})