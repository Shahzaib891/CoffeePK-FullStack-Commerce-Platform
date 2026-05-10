import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../helpers/postgre.js";
import authModel from "../models/auth.model.js";
import tokenModel from "../models/token.model.js";

// =========================
// LOGIN
// =========================
async function login(req, res) {
  try {
    const { email, password, rememberMe } = req.body;

    // DEBUG LOGS
    console.log("EMAIL SENT FROM FRONT:", email);
    console.log("PASSWORD SENT FROM FRONT:", password);

    const userInfo = await authModel.getUserInfo(email);

    console.log("DB USER ROWS:", userInfo.rows);

    if (userInfo.rows.length < 1) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    console.log("HASH FROM DATABASE:", userInfo.rows[0].password);

    const isPasswordValid = await bcrypt.compare(
      password,
      userInfo.rows[0].password
    );

    console.log("BCRYPT RESULT:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    // JWT PAYLOAD
    const payload = {
      id: userInfo.rows[0].id,
      email: userInfo.rows[0].email,
      role: userInfo.rows[0].role_id,
    };

    const expiresIn = rememberMe === "true"
      ? 7 * 24 * 60 * 60
      : 24 * 60 * 60;

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });

    const expirationDate = new Date(Date.now() + expiresIn * 1000);

    await tokenModel.store({
      token,
      expired_at: expirationDate,
    });

    return res.status(200).json({
      status: 200,
      msg: "Login successful!",
      data: { token, id_user: userInfo.rows[0].id },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({ status: 500, msg: "Internal Server Error" });
  }
}

// =========================
// REGISTER
// =========================
async function register(req, res) {
  const client = await db.connect();
  const { email, password, phone_number } = req.body;

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

  if (!email?.match(regexEmail))
    return res.status(422).json({ msg: "Invalid email input" });
  if (!password || password.length < 7)
    return res.status(422).json({ msg: "Password must be at least 7 characters" });
  if (!phone_number?.match(regexPhone))
    return res.status(422).json({ msg: "Invalid phone number" });

  try {
    const checkEmail = await authModel.checkEmail(email);
    if (checkEmail.rows[0].count > 0)
      return res.status(409).json({ msg: "Email already registered" });

    const checkPhone = await authModel.checkPhoneNumber(phone_number);
    if (checkPhone.rows[0].count > 0)
      return res.status(409).json({ msg: "Phone number already registered" });

    await client.query("BEGIN");

    const userInfo = await authModel.createUser(client, req.body);
    await authModel.createProfile(client, userInfo.rows[0].id);

    const userSelect = await authModel.selectUser(
      client,
      userInfo.rows[0].id
    );

    await client.query("COMMIT");

    return res.status(201).json({
      data: userSelect.rows,
      msg: "User successfully registered!",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  } finally {
    client.release();
  }
}

// =========================
// LOGOUT
// =========================
async function logout(req, res) {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (token) {
      await tokenModel.destroy(token);
      console.log("Token removed from database");
    }

    return res.status(200).json({
      status: 200,
      msg: "Logout successful!",
    });

  } catch (err) {
    console.log("LOGOUT ERROR:", err);
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

export default {
  login,
  register,
  logout,
};
