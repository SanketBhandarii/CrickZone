// TeamLeaderboard.js
import React from "react";

const teamsData = [
  { id: 1, name: "Team Alpha", matches: 10, wins: 8 },
  { id: 2, name: "Team Bravo", matches: 12, wins: 9 },
  { id: 3, name: "Team Delta", matches: 9, wins: 6 },
  { id: 4, name: "Team Echo", matches: 8, wins: 5 },
  { id: 5, name: "Team Foxtrot", matches: 7, wins: 4 },
];

const TeamLeaderboard = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
        Team Performance Leaderboard
      </h2>
      <div className="divide-y divide-gray-300">
        {teamsData.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-4 hover:bg-indigo-50 transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-indigo-600">
                #{index + 1}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {team.name}
              </span>
            </div>
            <div className="text-gray-600 font-medium">
              <p>{team.matches} Matches</p>
              <p>{team.wins} Wins</p>
              <p>
                Win Rate:{" "}
                {((team.wins / team.matches) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderboard;
