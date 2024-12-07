"use client";

import React, { useState } from "react";
import { Car, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi"
import { useScaffoldWatchContractEvent, useScaffoldWriteContract } from "~~/hooks/scaffold-eth"
import { useAnonAadhaar } from "@anon-aadhaar/react"
import {
  AnonAadhaarCore,
  deserialize,
  packGroth16Proof,
} from "@anon-aadhaar/core";

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    carRegistration: "",
    carType: "",
  });
  const [anonAadhaar] = useAnonAadhaar();


  let { address } = useAccount()

  const carTypes = ["2-Wheeler", "4-Wheeler", "Heavy Vehicle"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useScaffoldWatchContractEvent({
    contractName: "Backend",
    eventName: "UserCreated",
    // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
    // Parameters emitted by the event can be destructed using the below example
    // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    onLogs: logs => {
      logs.map(log => {
        const { userAddress, name, vehicleRegistrationNumber } = log.args;
        if (userAddress == address) {
          window.localStorage.setItem("user", JSON.stringify({name, vehicleRegistrationNumber}))
          router.push("/dashboard")
        }
      });
    },
  });

  const router = useRouter();
  const { writeContractAsync: contract } = useScaffoldWriteContract("Backend")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    const { anonAadhaarProofs } = anonAadhaar
    let result = await deserialize(anonAadhaarProofs[Object.keys(anonAadhaarProofs).length - 1].pcd)
    const packedGroth16Proof = packGroth16Proof(result.proof.groth16Proof);

    // Add your registration logic here
    let tx = await contract({
      functionName: "createUser",
      args: [
        formData.username,
        formData.carRegistration,
        formData.carType,
        address,
        {
          nullifier1: BigInt(result.proof.nullifier),
          nullifierSeed1: BigInt(result.proof.nullifierSeed),
          timestamp: BigInt(result.proof.timestamp),
          revealArray: [
            BigInt(result.proof.ageAbove18),
            BigInt(result.proof.gender),
            BigInt(result.proof.pincode),
            BigInt(result.proof.state),
          ],
          groth16Proof1: packedGroth16Proof.map(i => BigInt(i)) as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]
        },
      ]
    })
    // router.push("/dashboard");
  };

  return (
    <div className="bg-primary bg-opacity-80 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl m-40">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-primary">Vehicle Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <User className="w-4 h-4 opacity-70" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="grow"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            {/* Car Registration Input */}
            <div className="form-control mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <Car className="w-4 h-4 opacity-70" />
                <input
                  type="text"
                  name="carRegistration"
                  placeholder="Car Registration"
                  className="grow" 
                  value={formData.carRegistration}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            {/* Car Type Dropdown */}
            <div className="form-control mb-2">
              <select 
                className="select select-bordered w-full"
                name="carType"
                value={formData.carType}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">
                  Select Car Type
                </option>
                {carTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet Address Input */}
            <div className="form-control mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <Wallet className="w-4 h-4 opacity-70" />
                <input 
                  type="text"
                  name="walletAddress"
                  placeholder="Wallet Address"
                  className="grow"
                  value={address}
                  disabled={true}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button type="submit" className="btn btn-primary">
                Register Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
