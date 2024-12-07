"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, CreditCard, Gift, Star, TrendingUp, Trophy, Wallet, Zap } from "lucide-react";

const RewardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("rewards");
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    currentTier: "",
    nextTierPoints: 0,
    pointsToNextTier: 0,
  });

  useEffect(() => {
    // Fetch user stats and rewards
    const fetchUserStats = async () => {
      // Mock user stats
      setUserStats({
        totalPoints: 1750,
        currentTier: "Tier 7",
        nextTierPoints: 2000,
        pointsToNextTier: 250,
      });
    };

    fetchUserStats();

    const calculateTier = (points: number) => {
      if (points >= 2000) return "Tier 8";
      if (points >= 1500) return "Tier 7";
      if (points >= 1000) return "Tier 6";
      if (points >= 750) return "Tier 5";
      if (points >= 500) return "Tier 4";
      if (points >= 250) return "Tier 3";
      if (points >= 100) return "Tier 2";
      return "Tier 1";
    };

    const userPoints = 1750;
    setCurrentTier(calculateTier(userPoints));
  }
  , []);

  const rewardTiers = [
    { name: "Tier 1", points: 0, color: "badge-primary" },
    { name: "Tier 2", points: 100, color: "badge-primary" },
    { name: "Tier 3", points: 250, color: "badge-primary" },
    { name: "Tier 4", points: 500, color: "badge-primary" },
    { name: "Tier 5", points: 750, color: "badge-primary" },
    { name: "Tier 6", points: 1000, color: "badge-primary" },
    { name: "Tier 7", points: 1500, color: "badge-primary" },
    { name: "Tier 8", points: 2000, color: "badge-primary" },
  ];

  const coupons = [
    {
      id: "coup1",
      title: "20% Off Fuel",
      description: "Discount at partner gas stations",
      points: 250,
      icon: <Zap className="w-8 h-8 text-orange-500" />,
    },
    {
      id: "coup2",
      title: "Free Car Wash",
      description: "Complimentary full detail service",
      points: 500,
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
    },
    {
      id: "coup3",
      title: "ETH Conversion",
      description: "Convert points to Ethereum",
      points: 1000,
      icon: <Wallet className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Trophy className="w-10 h-10" /> My Rewards
          </h1>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-semibold">{userStats.totalPoints} Points</span>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">Reward Tiers</h2>
            <div className="flex justify-between items-center">
              {rewardTiers.map((tier, index) => (
                <div key={tier.name} className="flex flex-col items-center">
                  <div
                    className={`badge ${tier.color} ${currentTier === tier.name ? "badge-lg" : "opacity-50"}`}
                  >
                    {tier.name}
                  </div>
                  <div className="text-xs mt-1">{tier.points} pts</div>
                </div>
              ))}
            </div>
            <div className="w-full bg-base-200 h-2 rounded-full mt-4">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `${(userStats.totalPoints / rewardTiers[7].points) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-sm mt-2 text-center">
              {userStats.pointsToNextTier > 0 ? (
                <>
                  {Math.abs(userStats.pointsToNextTier)} points to
                  <span className="font-bold ml-1">Platinum Tier</span>
                </>
              ) : (
                <span className="text-success">You've reached the top tier!</span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-bordered mb-6">
          <a
            role="tab"
            className={`tab ${activeTab === "rewards" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("rewards")}
          >
            Available Rewards
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "claimed" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("claimed")}
          >
            Claimed Rewards
          </a>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {coupons.map(coupon => (
            <div key={coupon.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  {coupon.icon}
                  <div className="badge badge-primary">{coupon.points} pts</div>
                </div>
                <h2 className="card-title">{coupon.title}</h2>
                <p className="text-sm">{coupon.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedCoupon(coupon.id)}>
                    Claim <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ETH Conversion Modal */}
        {selectedCoupon === "coup3" && (
          <dialog id="eth_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Convert Points to ETH</h3>
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <span>Available Points:</span>
                  <span className="font-bold">{userStats.totalPoints}</span>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Points to Convert</span>
                  </label>
                  <input type="number" placeholder="Enter points" className="input input-bordered w-full" />
                </div>
                <div className="mt-4 text-center">
                  <div className="stat">
                    <div className="stat-title">Estimated ETH</div>
                    <div className="stat-value text-primary">0.025</div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={() => setSelectedCoupon(null)}>
                  Convert
                </button>
                <button className="btn btn-ghost" onClick={() => setSelectedCoupon(null)}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;
