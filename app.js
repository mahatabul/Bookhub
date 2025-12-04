const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
