const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let highscores = [];

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "highscore.html"));
});

// JSON view page
app.get("/highscores-view", (req, res) => {
  res.sendFile(path.join(__dirname, "highscores-view.html"));
});

// GET top 10
app.get("/highscores", (req, res) => {
  const topScores = [...highscores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  res.json(topScores);
});

app.post('/highscore', (req, res) => {
  try {
    console.log("BODY:", req.body);

    const name = req.body.name;
    const score = req.body.score;

    if (!name || typeof score !== 'number' || score <= 0) {
      return res.status(400).send('Invalid data');
    }

    highscores.push({ name: name, score: score });

    highscores.sort((a, b) => b.score - a.score);

    if (highscores.length > 10) {
      highscores = highscores.slice(0, 10);
    }

    res.status(201).json({ name: name, score: score });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).send("Server crashed");
  }
});
// DELETE all
app.delete("/highscores", (req, res) => {
  highscores = [];
  res.sendStatus(200);
});

// START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
