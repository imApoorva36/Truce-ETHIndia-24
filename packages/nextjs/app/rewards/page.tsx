import React from "react";

export default function RewardsScreen() {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Rewards Balance */}
      <div className="card bg-primary text-primary-content shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Total Rewards Balance</h2>
          <p className="text-3xl">₹1,000</p>
        </div>
      </div>

      {/* Reward Claim History */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">Reward Claim History</h2>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>1st Dec 2024</td>
                  <td>₹500</td>
                  <td className="text-green-500">Claimed</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>15th Nov 2024</td>
                  <td>₹300</td>
                  <td className="text-green-500">Claimed</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>10th Oct 2024</td>
                  <td>₹200</td>
                  <td className="text-green-500">Claimed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Claim Rewards Button */}
      <div className="flex justify-center">
        <button className="btn btn-accent w-full md:w-auto">Claim Rewards</button>
      </div>
    </div>
  );
}
