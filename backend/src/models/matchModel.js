import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true, 
  },
  over : {
    type: Number,
    required: true
  },
  teams: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true, 
  },
  location: {
    type: String,
    required: true, 
  },
});

export const Match = mongoose.model("Match", matchSchema);
