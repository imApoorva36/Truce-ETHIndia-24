"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnonAadhaarCore, deserialize, packGroth16Proof } from "@anon-aadhaar/core";
import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import { Car, User, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { DLModal } from "./component/dl-modal";
import AadharVerify from "~~/components/AadharVerify"

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    vehicleRegistration: "",
    vehicleType: "",
  });
  const [anonAadhaar] = useAnonAadhaar();
  const { address: connectedAddress } = useAccount();

  let { address } = useAccount();

  const vehicleTypes = ["2-Wheeler", "4-Wheeler", "Heavy Vehicle"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleOpenDLModal = () => {
    // Open the Digilocker Modal
  };


  const router = useRouter();
  const { writeContractAsync: contract } = useScaffoldWriteContract("Backend");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    const { anonAadhaarProofs } = anonAadhaar;
    let result = await deserialize(anonAadhaarProofs[Object.keys(anonAadhaarProofs).length - 1].pcd);
    const packedGroth16Proof = packGroth16Proof(result.proof.groth16Proof);

    // Add your registration logic here
    let tx = await contract({
      functionName: "createUser",
      args: [
        formData.username,
        formData.vehicleRegistration,
        formData.vehicleType,
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
          groth16Proof1: packedGroth16Proof.map(i => BigInt(i)) as [
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
            bigint,
          ],
        },
      ],
    });

    if (tx) {
      router.push("/login");
    }
    else
      alert("Error")

  };

  return (
    <div className="bg-primary bg-opacity-80 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl m-40">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-primary">Vehicle Registration</h2>
          <AadharVerify />
          <button className="btn btn-secondary mt-4 w-full" onClick={openModal}>
            Verify with Driving License
          </button>
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button onClick={closeModal} className="close-button">
                  &times;
                </button>
                <DLModal />
              </div>
            </div>
          )}
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
                  name="vehicleRegistration"
                  placeholder="Vehicle Registration"
                  className="grow"
                  value={formData.vehicleRegistration}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            {/* Car Type Dropdown */}
            <div className="form-control mb-2">
              <select
                className="select select-bordered w-full"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">
                  Select Vehicle Type
                </option>
                {vehicleTypes.map(type => (
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
