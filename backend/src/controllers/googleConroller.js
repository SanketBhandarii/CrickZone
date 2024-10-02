import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { randomUUID } from "crypto";

const generateTokenAndRespond = (user, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })
    .json({
      msg: "Login Successful",
    });
};

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

    // Create a new user
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
