const express = require("express");
const cors = require("cors");
const Fuse = require("fuse.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Self-contained Q&A data
const qaData = [
  {
    question: "What is inflation?",
    answer: "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power."
  },
  {
    question: "Why does inflation happen?",
    answer: "Inflation can be caused by demand-pull, cost-push, or built-in mechanisms."
  },
  {
    question: "Milk price",
    answer: "Milk cost increased from ₹40 in 2015 to ₹60 in 2024."
  },
  {
    question: "Petrol price",
    answer: "Petrol increased from ₹65 in 2015 to ₹105 in 2024."
  }
];

// Use Fuse.js for fuzzy matching
const fuse = new Fuse(qaData, {
  keys: ['question'],
  threshold: 0.4,
  includeScore: true
});

app.post("/api/answer", (req, res) => {
  const userQuestion = req.body.question?.toLowerCase();

  if (!userQuestion) {
    return res.status(400).json({ error: "Question is required" });
  }

  const result = fuse.search(userQuestion);

  if (result.length > 0) {
    res.json({ answer: result[0].item.answer });
  } else {
    res.json({ answer: "Sorry, I couldn't find a good match for your question." });
  }
});

app.get("/", (req, res) => {
  res.send("Self-contained AI Inflation API is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
