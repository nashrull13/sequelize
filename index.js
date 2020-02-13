const express = require("express");
const logger = require("morgan");

const port = 3001;
const address = "localhost";

const app = express();

app.use(logger("dev"));
app.use(express.json());
require("./routes/books.js")(app);

// Create a Server
var server = app.listen(3001, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
