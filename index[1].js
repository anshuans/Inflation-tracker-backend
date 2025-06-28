const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const questions = {
  "what is inflation?": "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power.",
  "how does inflation affect savings?": "Inflation decreases the value of money over time, meaning your savings will buy less in the future.",
  "what causes inflation?": "Common causes include increased production costs, demand exceeding supply, and expansion of the money supply.",
};

app.get("/", (req, res) => {
  res.send("Welcome to the Inflation Tracker API!");
});

app.get("/api/ask", (req, res) => {
  const q = req.query.q?.toLowerCase();
  const answer = questions[q];
  if (answer) {
    res.json({ question: q, answer });
  } else {
    res.json({ question: q, answer: "Sorry, I don't know the answer to that." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});