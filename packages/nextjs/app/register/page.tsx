"use client";

import React, { useState } from "react";
import { Car, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    carRegistration: "",
    carType: "",
    walletAddress: "",
  });

  const carTypes = ["2-Wheeler", "4-Wheeler", "Heavy Vehicle"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Form submitted:", formData);
    router.push("/dashboard");
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
                  value={formData.walletAddress}
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
