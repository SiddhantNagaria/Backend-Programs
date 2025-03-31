const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//handling requests

app.use((req, res) => {
  //sending object

  // res.send({
  //     message: 'Hello World!',
  //     status: 200
  // });
  let list = "<h1>List of something</h1><br/><li>Hi something</li>";
  res.send(list);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});