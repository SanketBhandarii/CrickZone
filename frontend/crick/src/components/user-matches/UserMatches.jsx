import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/userMatches`,
          { withCredentials: true }
        );
        setMatches(response.data.matches);
      } catch (error) {
        setError("Error fetching matches");
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserMatches();
  }, []);

  const handleDelete = async (matchId) => {
    const confirmation = window.confirm("Are sure you want to delete?");
    if (confirmation) {
      console.log("Delete match with ID:", matchId);
      const newMatches = matches.filter((m) => m._id != matchId);
      setMatches(newMatches);
      try {
        const response = await axios.post(
          `http://localhost:8000/match/deleteMatch`,
          { matchId },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 w-full h-screen bg-gray-900">
        <h2 className="text-2xl text-white">Loading matches...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <h2 className="text-2xl text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-10 px-7 max-sm:px-4 bg-gray-900 relative">
      <div className="h-auto max-w-full absolute top-8 left-8">
        <button className="flex items-center gap-2 text-white sm:text-xl">
          <i
            className="fa-solid fa-circle-left text-3xl sm:text-3xl"
            onClick={() => navigate("/")}
          ></i>
          <span className="ml-2 text-xl">Your Previous Matches</span>
        </button>
      </div>

      {matches.length === 0 ? (
        <div className="text-white text-lg">No matches found.</div>
      ) : (
        <div className="flex flex-col w-full max-w-full px-4 mt-9 max-sm:px-2 overflow-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {matches.map((match, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-xl transition-transform duration-300 hover:shadow-2xl w-full sm:w-72 md:w-80 relative"
              >
                <i
                  class="fa-solid fa-circle-xmark absolute top-2 cursor-pointer right-2 text-yellow-200 text-3xl"
                  onClick={() => handleDelete(match._id)}
                ></i>

                <div className="flex justify-between mb-2 mt-6">
                  <div className="text-sm text-gray-300 flex">
                    <span className="font-semibold pr-1 text-lime-400">
                      Overs:
                    </span>
                    {match.over}
                  </div>
                  <div className="text-sm text-gray-300 flex">
                    <span className="font-semibold px-1 text-lime-400">
                      Location:
                    </span>
                    {match.location}
                  </div>
                </div>
                <div className="flex gap-3 items-center mb-3">
                  <span className="text-lg font-semibold text-white">
                    {match.teams}
                  </span>
                  <span className="text-xs text-gray-300">{match.date}</span>
                </div>
                <div className="text-gray-100 mb-2">
                  <span className="font-semibold text-lime-400">Result: </span>
                  {match.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMatches;
