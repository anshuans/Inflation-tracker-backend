const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let qaData = [];

// Load Q&A from file
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error loading Q&A data:", err);
  } else {
    qaData = JSON.parse(data);
  }
});

// API route
app.post("/api/answer", (req, res) => {
  const userQuestion = req.body.question?.toLowerCase();

  if (!userQuestion) {
    return res.status(400).json({ error: "Question is required" });
  }

  const match = qaData.find(q =>
    userQuestion.includes(q.question.toLowerCase())
  );

  if (match) {
    res.json({ answer: match.answer });
  } else {
    res.json({ answer: "Sorry, I don't know the answer to that." });
  }
});

app.get("/", (req, res) => {
  res.send("Inflation Tracker API is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});