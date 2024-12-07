// pages/fine-details.js
import React from "react";

export default function FineDetails() {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Fine Details */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold text-primary">Fine Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-lg font-medium">Violation Type:</p>
              <p className="text-lg">Speeding</p>
            </div>
            <div>
              <p className="text-lg font-medium">Fine Amount:</p>
              <p className="text-lg">₹1,500</p>
            </div>
            <div>
              <p className="text-lg font-medium">Date:</p>
              <p className="text-lg">7th December 2024</p>
            </div>
            <div>
              <p className="text-lg font-medium">Time:</p>
              <p className="text-lg">10:30 AM</p>
            </div>
            <div>
              <p className="text-lg font-medium">Location:</p>
              <p className="text-lg">MG Road, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Snapshot */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold text-primary">Evidence</h2>
          <div className="mt-4">
            <img
              src="/cctv-evidence.jpg" // Replace with actual evidence URL
              alt="CCTV Snapshot"
              className="rounded-lg w-full max-w-sm mx-auto"
            />
            <a
              href="/video-link" // Replace with the actual video link
              className="link link-primary mt-2 block text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Video Evidence
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn btn-primary w-full md:w-auto">Appeal Fine</button>
        <button className="btn btn-secondary w-full md:w-auto">Pay Fine</button>
      </div>
    </div>
  );
}
