const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 🔥 POST route (ye tumne diya)
app.post("/booking", (req, res) => {
  console.log("Data received:", req.body);
  res.json({ message: "Booking saved!" });
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});