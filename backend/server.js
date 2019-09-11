const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
<<<<<<< Updated upstream
=======
const cors = require('cors');
const WebSocket = require('ws');

>>>>>>> Stashed changes




const app = express();
const wss = new WebSocket.Server({ port: 3030 });


app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
app.use("/api/users", users);

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));



    
require("./config/passport")(passport);
app.use(passport.initialize);



const port = 5000;
app.listen(port, () => console.log(`Server is up and running on port: ${port}`));



wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });