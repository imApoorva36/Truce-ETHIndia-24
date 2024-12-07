// pages/index.js
import React from "react";

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Wallet Balance</h2>
            <p>₹10,000</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Fines Paid</h2>
            <p>₹2,500</p>
          </div>
        </div>
        <div className="card bg-secondary text-accent-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Rewards Earned</h2>
            <p>₹500</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Recent Violations</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Violation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Speeding</td>
                  <td className="text-red-500">Pending</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Wrong Parking</td>
                  <td className="text-green-500">Paid</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Signal Jump</td>
                  <td className="text-yellow-500">Appealed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn btn-primary w-full md:w-auto">View Fines</button>
        <button className="btn btn-primary w-full md:w-auto">Claim Rewards</button>
        <button className="btn btn-secondary w-full md:w-auto">Appeal Fine</button>
      </div>
    </div>
  );
}
