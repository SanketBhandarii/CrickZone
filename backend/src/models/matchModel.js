import mongoose from "mongoose";
// Define the schema for the match
const matchSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true, // Date in a human-readable format
  },
  over : {
    type: Number,
    required: true
  },
  teams: {
    type: String,
    required: true, // E.g., "Team A vs Team B"
  },
  result: {
    type: String,
    required: true, // E.g., "Team A won by 4 wickets"
  },
  location: {
    type: String,
    required: true, // Location of the match, e.g., "Mumbai"
  },
});

// Create the model from the schema
export const Match = mongoose.model("Match", matchSchema);
