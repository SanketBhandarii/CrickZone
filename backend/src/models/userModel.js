import mongoose, { Schema } from "mongoose";
import { Match } from "./matchModel.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationIdentifier:{
    type:String,
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Match,
    },
  ],
});

export const User = mongoose.model("user", userSchema);
