import React, { useEffect, useState } from "react";
import axios from "axios";

function UserMatches() {
  const [matches, setMatches] = useState([]); // State for matches
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/userMatches`,
          { withCredentials: true }
        ); // Assuming this is your API route
        setMatches(response.data.matches);
      } catch (error) {
        setError("Error fetching matches");
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
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
    <div className="flex flex-col items-center justify-center py-10 px-7 mx-2 max-sm:px-4 rounded-lg">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center w-full max-w-4xl">
        Your Previous Matches
      </h1>

      {/* Conditional rendering for no matches */}
      {matches.length === 0 ? (
        <div className="text-white text-lg">No matches found.</div>
      ) : (
        // Horizontal Scrollable Container for Matches
        <div className="flex gap-4 relative flex-wrap justify-center overflow-x-auto w-full max-w-full px-4 max-sm:px-2">
          {matches.map((match, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-xl transition-transform duration-300 hover:shadow-2xl w-64 md:w-72 lg:w-80"
            >
              {/* Match Information */}
              <div className="flex justify-between mb-2">
                <div className="text-sm text-gray-300 flex">
                  <span className="font-semibold pr-1 text-lime-400">
                    Overs:{" "}
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
      )}
    </div>
  );
}

export default UserMatches;
