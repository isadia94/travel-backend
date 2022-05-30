const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

//built-in middleware to handle url encoded data
// in other words form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//built-in middleware for cookies
app.use(cookieParser());

//Routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/hotels", require("./routes/hotels"));
app.use("/rooms", require("./routes/rooms"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    throw error;
  }
};

app.listen(8800, () => {
  connectDB();
  console.log("server is running on port 8800");
});
