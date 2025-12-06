const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const port = process.env.PORT || 5000;
const errorhandler = require("./middleware/errorhandler");
const notFoundmiddleware = require("./middleware/not-Found");


app.use(express.json());
app.use(cors());

// middleware

app.use(errorhandler);
app.use(notFoundmiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Listening to server on port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
