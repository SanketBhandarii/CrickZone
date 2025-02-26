import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CurrentNews = () => {
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const PROXY_SERVER = import.meta.env.VITE_BACKEND_URL;

  const fetchLatestMatches = async () => {
    try {
      const response = await axios.get(`${PROXY_SERVER}/latest/cricknews`);
      setMatchData(response.data.topHeadlines);
    } catch (error) {
      console.error("Error fetching live matches:", error);
      setMatchData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestMatches();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 p-4">
      {/* Back button aligned at top-left with padding */}
      <div className="absolute top-8 left-8">
        <button
          onClick={() => navigate("/zone")}
          className="flex items-center gap-2 text-white text-lg sm:text-xl"
        >
          <i className="fa-solid fa-circle-left text-3xl sm:text-3xl"></i>
          <span>Back</span>
        </button>
      </div>

      <div className="w-full max-w-screen-lg p-6 sm:p-8 bg-gray-900 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
          Top Cricket Headlines
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading..</p>
        ) : (
          <ul className="space-y-3 sm:space-y-4">
            {matchData.map((headline, index) => (
              <li
                key={index}
                className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow hover:bg-gray-700 transition duration-300"
              >
                <h3 className="text-md sm:text-lg font-semibold text-white">
                  {headline}
                </h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CurrentNews;
