import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { randomUUID } from "crypto";
import { generateTokenAndRespond } from "../utils/generateTokenAndRespond.js";

export const googleLogin = async (req, res) => {
  const { username, googleEmail } = req.body;

  if (!username || !googleEmail) {
    return res.status(400).json({ msg: "Credentials are missing" });
  }

  try {
    let user = await User.findOne({
      $or: [{ username }, { email: googleEmail }],
    });

    if (user) {
      return generateTokenAndRespond(user, res);
    }

    user = await User.create({
      username,
      email: googleEmail,
      password: randomUUID(),
      verified: true,
    });

    return generateTokenAndRespond(user, res);
  } catch (error) {
    console.error("Error during Google login:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
