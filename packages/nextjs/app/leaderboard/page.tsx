'use client';

import React, { useState } from "react";

const leaderboardData = [
  { rank: 1, name: "Alice", points: 1200 },
  { rank: 2, name: "Bob", points: 1100 },
  { rank: 3, name: "Charlie", points: 1000 },
  { rank: 4, name: "Dave", points: 950 },
  { rank: 5, name: "Eve", points: 900 },
  { rank: 6, name: "Frank", points: 850 },
  { rank: 7, name: "Grace", points: 800 },
  { rank: 8, name: "Heidi", points: 750 },
  { rank: 9, name: "Ivan", points: 700 },
  { rank: 10, name: "Judy", points: 650 },
  { rank: 11, name: "Mallory", points: 600 },
  { rank: 12, name: "Oscar", points: 550 },
];

const SearchableLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter leaderboard data based on the search query
  const filteredData = leaderboardData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.rank.toString().includes(searchQuery) ||
      user.points.toString().includes(searchQuery)
  );

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">🔍 Search Users</h2>
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="Search by name, rank, or points..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.rank} className="hover">
                  <td>#{user.rank}</td>
                  <td className="font-semibold">{user.name}</td>
                  <td>{user.points} pts</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-error">
                  No results found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RewardLeaderboard = () => {
  return (
    <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 p-6  rounded-lg shadow-lg">
      {/* Left: Top 10 Leaderboard */}
      <div className="bg-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🏆 Top 10 Leaderboard</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
              <th>Reward</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.slice(0, 10).map((user, index) => (
              <tr key={index} className="hover">
                <td>
                  <div
                    className={`badge badge-lg ${
                      user.rank === 1
                        ? "badge-warning"
                        : user.rank === 2
                        ? "badge-accent"
                        : user.rank === 3
                        ? "badge-info"
                        : "badge-outline"
                    }`}
                  >
                    #{user.rank}
                  </div>
                </td>
                <td className="font-semibold">{user.name}</td>
                <td>{user.points} pts</td>
                <td>
                  {user.rank === 1 && <span className="badge badge-warning">Gold</span>}
                  {user.rank === 2 && <span className="badge badge-accent">Silver</span>}
                  {user.rank === 3 && <span className="badge badge-info">Bronze</span>}
                  {user.rank > 3 && <span className="badge badge-outline">Top 10</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right: Searchable Table */}
      <SearchableLeaderboard />
    </div>
  );
};

export default RewardLeaderboard;
