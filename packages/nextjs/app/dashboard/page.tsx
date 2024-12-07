"use client";

import React from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { Balance } from "~~/components/scaffold-eth";
import ViolationsTable from "~~/components/violations-table";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

export default function HomeDashboard() {
  const { address: connectedAddress } = useAccount();
  const account = { address: connectedAddress };
  const { targetNetwork } = useTargetNetwork();
  const chain = targetNetwork;

  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center">Wallet Balance</h2>
            {account.address ? (
              <>
                <Balance address={account.address as Address} className="text-xl text-center" />
                {chain && <span className="text-md text-center">{chain.name}</span>}
              </>
            ) : (
              <p className="text-center text-red-500">No wallet connected</p>
            )}
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Fines Paid</h2>
            <div className="flex items-center justify-center text-xl">
              <span>0.001</span>
              <span className="text-[0.8em] font-bold ml-1">{targetNetwork.nativeCurrency.symbol}</span>
            </div>
            {chain && <span className="text-md text-center">{chain.name}</span>}
          </div>
        </div>
        <div className="card bg-secondary text-accent-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Rewards Earned</h2>
            <div className="flex items-center justify-center text-xl">
              <span>100</span>
            </div>
            <span className="text-md text-center">Points</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Recent Violations</h2>
          <ViolationsTable />
        </div>
      </div>
    </div>
  );
}
