const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* -------------------------
   FRONTEND PAGES
--------------------------*/

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "highscore.html"));
});

// View page
app.get("/highscores-view", (req, res) => {
  res.sendFile(path.join(__dirname, "highscores-view.html"));
});

/* -------------------------
   HEALTH CHECK
--------------------------*/

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* -------------------------
   HIGH SCORES API
--------------------------*/

// GET top 10 scores
app.get("/highscores", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM highscores ORDER BY score DESC LIMIT 10"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// POST new score
app.post("/highscore", async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name || typeof score !== "number" || score <= 0) {
      return res.status(400).send("Invalid data");
    }

    const result = await pool.query(
      "INSERT INTO highscores (name, score) VALUES ($1, $2) RETURNING *",
      [name, score]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// DELETE all scores
app.delete("/highscores", async (req, res) => {
  try {
    await pool.query("DELETE FROM highscores");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

/* -------------------------
   START SERVER
--------------------------*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});