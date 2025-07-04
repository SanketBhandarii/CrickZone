import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url"; // To resolve the __dirname
import { sendVerificationEmail } from "../service/emailService.js";
// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    if (user.verified == false) {
      res.json({
        msg: "You are not verified!",
      });
      return;
    }
    const comparedPassword = bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({ msg: "Login Successful" });
  } catch (e) {
    console.log(e);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email }],
    });

    if (user) {
      res.json({ msg: "User with these credentials already exists" });
      return;
    }

    let hashed = await bcrypt.hash(password, 10);
    const verificationIdentifier = randomUUID();

    try {
      // Send the verification email first
      let emailSent = await sendVerificationEmail(
        email,
        verificationIdentifier
      );

      if (emailSent) {
        // Only create the user if the email was sent successfully
        user = await User.create({
          username,
          email,
          password: hashed,
          verified: false,
          verificationIdentifier,
        });
        res.json({
          msg: "SignUp successful, check your mail for verification",
        });
      } else {
        res.json({
          msg: "Email Id Invalid",
        });
      }
    } catch (error) {
      res.json({ msg: "Error sending verification email." });
      console.error("Failed to send verification email:", error);
    }
  } catch (e) {
    console.log("Error during signup:", e);
    res.status(500).json({ msg: "An error occurred during signup." });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      verificationIdentifier: token,
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    } else {
      user.verified = true;
      await user.save();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};

export const getUserMatches = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded._id;

    const user = await User.findById(userId).populate("matches");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ matches: user.matches });
  } catch (error) {
    console.error("Error fetching user matches:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch user matches", error });
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({ msg: "Logout Successfull" });
};
