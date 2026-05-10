import jwt from "jsonwebtoken";
import tokenModel from "../models/token.model.js";

async function check(req, res, next) {
  try {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      return res.status(403).json({
        status: 403,
        msg: "Access denied! Not logged in",
      });
    }

    const token = bearerToken.split(" ")[1];

    // Check if token exists in PostgreSQL
    const tokenVerify = await tokenModel.get(token);

    if (!tokenVerify) {
      return res.status(403).json({
        status: 403,
        msg: "JWT Rejected",
      });
    }

    // Verify JWT signature
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          msg: err.message,
        });
      }

      req.authInfo = payload;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

function admin(req, res, next) {
  if (req.authInfo.role <= 1) {
    return res.status(403).json({
      status: 403,
      msg: "Access denied!",
    });
  }
  next();
}

export default { check, admin };
