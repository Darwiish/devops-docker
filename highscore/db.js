const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT || 5432,
});

// Auto-create table if it doesn't exist
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS highscores (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        score INT NOT NULL
      );
    `);

    console.log("Database ready: highscores table ensured");
  } catch (err) {
    console.error("DB init error:", err);
  }
};

initDB();

module.exports = pool;