import db from "../helpers/postgre.js";

async function store({ token, expired_at }) {
  try {
    const result = await db.query(
      `INSERT INTO tokens (token, expired_at) VALUES ($1, $2) RETURNING *`,
      [token, expired_at]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function get(token) {
  try {
    const result = await db.query(
      `SELECT * FROM tokens WHERE token = $1`,
      [token]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function destroy(token) {
  try {
    const result = await db.query(
      `DELETE FROM tokens WHERE token = $1 RETURNING *`,
      [token]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { store, get, destroy };
