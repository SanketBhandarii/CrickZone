import { Match } from "../models/matchModel.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createMatch = async (req, res) => {
  const { date, over, teams, result, location } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded._id;

    const newMatch = await Match.create({
      date,
      over,
      teams,
      result,
      location,
    });

    const user = await User.findByIdAndUpdate(userId, {
      $push: { matches: newMatch._id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(201)
      .json({ msg: "Match created successfully", match: newMatch });
  } catch (error) {
    console.error("Error creating match:", error);
    return res.status(500).json({ message: "Failed to create match", error });
  }
};
