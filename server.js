// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static("public"));


// random number is generated and sent
app.get("/api/data", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.json({ message: `Your random number from EXPRESS is: ${randomNumber}` });
  });

  // generic greeting
app.get("/api/greet", (req, res) => {
    res.json({ message: "Hello from /api/greet!" });
  });
  

  // dynamic greeting that uses variable sent from Vue/index.html
app.get("/api/hello", (req, res) => {
    const name = req.query.name || "Anonymous";
    res.json({ message: `Hello, ${name}!` });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
