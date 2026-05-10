import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL Connected Successfully");
  } catch (error) {
    console.error("PostgreSQL Connection Error:", error.message);
    process.exit(1);
  }
};

export default { pool, connect };
