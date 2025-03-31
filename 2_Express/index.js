const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//handling requests

// app.use((req, res) => {
  //sending object as response

  // res.send({
  //     message: 'Hello World!',
  //     status: 200
  // });
//   let list = "<h1>List of something</h1><br/><li>Hi something</li>";
//   res.send(list);
// });


//ROUTING

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/hello', (req, res) => {
  res.send({
      message: 'Hello World!',
      status: 200
  })
});


//wildcard route
app.get('*', (req, res) => {
  res.send("Page not found");
});


//Path Parameters
app.get("/:username/:id", (req, res) => {
    let {username, id} = req.params;
    res.send(`Hello ${username} with id ${id}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});