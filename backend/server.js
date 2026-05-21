const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("C:/Users/Shivani/Downloads/DEV STUDIO WEBSITE/backend/public/images"));

// Home Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Gallery Route
app.get("/api/gallery", (req, res) => {
  res.json([
    { id: 1, image: "/images/shoot1.jpeg", title: "Wedding Shoot" },
    { id: 2, image: "/images/shoot2.jpeg", title: "Pre Wedding" },
    { id: 3, image: "/images/shoot3.jpeg", title: "Shoot 3" },
    { id: 4, image: "/images/shoot4.jpeg", title: "Shoot 4" }
  ]);
});
// Start Server
console.log(__dirname);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});