import axios from "axios";

export const crickNewsProvider = async (req, res) => {
  try {
    const response = await axios.get(
      process.env.API_URL,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": process.env.RAPID_API_HOST,
        },
      }
    );
    const stories = response.data.storyList;
    const topHeadlines = stories
      .filter((item) => item.story)
      .slice(0, 6)
      .map((item) => item.story.hline);
    return res.json({ topHeadlines });
  } catch (error) {
    console.error("Error fetching live matches:", error);
  }
};
