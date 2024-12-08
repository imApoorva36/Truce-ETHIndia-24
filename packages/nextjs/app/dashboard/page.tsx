"use client";

import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { Balance } from "~~/components/scaffold-eth";
import ViolationsTable from "~~/components/violations-table";
import { useScaffoldReadContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

export default function HomeDashboard() {
  const { address } = useAccount();
  const account = { address };

  const { targetNetwork } = useTargetNetwork();
  const chain = targetNetwork;
  let router = useRouter()
  let [ user, setUser ] = useState<any>(false)

  let { data: userData } = useScaffoldReadContract({ contractName: "Backend", functionName: "getUserDetailsByAddress", args: [address] })
  let { data: violations } = useScaffoldReadContract({ contractName: "Backend", functionName: "getUserViolations", args: [address]})
  let { data: userPoints } = useScaffoldReadContract({ contractName: "Backend", functionName: "getUserPoints", args: [address] })

  let rewardBalance = userData ? userData[4] : 0;

  console.log(violations)
  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      router.push("/register")
      return
    }

    setUser(JSON.parse(window.localStorage.getItem("user") || ""))
  }, [])

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
            <h2 className="card-title">Total Points</h2>
            <div className="flex flex-col items-center justify-center text-xl">
              <span>{(userPoints || 0).toString()}</span>
            Points
            </div>
          </div>
        </div>
        <div className="card bg-secondary text-accent-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Rewards Earned</h2>
            <div className="flex items-center justify-center text-xl">
              <span>{(rewardBalance || 0).toString()}</span>
            </div>
            <span className="text-md text-center">Wei</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">All Violations</h2>
          {/* @ts-ignore */}
          {violations ? <ViolationsTable violations={violations} /> : null}
        </div>
      </div>
    </div>
  );
}
