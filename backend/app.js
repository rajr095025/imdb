const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("./route");
const db = require("./config");

const PORT = "8000";
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/imdb", cors(), router);

const startServer = () => {
  app.listen(PORT, () => {
    console.log("Server is running on port : " + PORT);
  });
};

db.getConnection((error, connection) => {
  if (error) {
    console.log("Error connecting to the Database", error);
  } else {
    console.log("Connected to the Database");
    connection.release();
    startServer();
  }
});
