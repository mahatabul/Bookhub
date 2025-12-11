const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const port = process.env.PORT || 5000;
const errorhandler = require("./middleware/errorhandler");
const notFoundmiddleware = require("./middleware/not-Found");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

app.use(express.json());
app.use(cors());

// routes
app.use("api/v1/users", userRoutes);
app.use("api/v1/books", bookRoutes);
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
