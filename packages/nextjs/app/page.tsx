"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Car, Check, MapPin, Shield, Wallet, Zap } from "lucide-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { address: connectedAddress } = useAccount();

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Enhanced Safety Tracking",
      description: "Monitor your driving behavior and improve safety with real-time insights.",
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Reward Program",
      description: "Earn points for safe driving, redeemable for exclusive rewards and benefits.",
    },
    {
      icon: <Wallet className="w-12 h-12 text-primary" />,
      title: "Crypto Rewards",
      description: "Convert your safe driving points directly to cryptocurrency.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      quote: "This app completely transformed how I view my driving habits!",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Software Engineer",
      quote: "The rewards program is incredible. I'm actually saving money by driving safely.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <header className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="mockup-phone border-primary">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo laptop-1 bg-base-100">
                <img src="/mockup.png" alt="App Screenshot" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">
              Drive Safe,
              <br />
              <span className="text-primary">Earn Rewards</span>
            </h1>
            <p className="py-6 text-lg">
              Transform your driving experience with our innovative platform that tracks your safety, rewards your good
              habits, and lets you earn cryptocurrency while on the road.
            </p>
            <div className="join w-full">
              <button
                className="btn btn-primary join-item"
                onClick={() => {
                  /* Add email signup logic */
                }}
              >
                Get Started <ArrowRight className="ml-2" />
              </button>
              <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
                <p className="my-2 font-medium">Connected Address:</p>
                <Address address={connectedAddress} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              How <span className="text-primary">SafeDrive</span> Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              A comprehensive platform that turns safe driving into a rewarding experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  {feature.icon}
                  <h3 className="card-title mt-4">{feature.title}</h3>
                  <p className="text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Your Journey to <span className="text-primary">Safer Driving</span>
            </h2>
          </div>

          <div className="timeline timeline-vertical">
            <div className="timeline-start text-center mb-12">
              <div className="timeline-middle">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <div className="timeline-end timeline-box">
                <h3 className="font-bold text-xl">Sign Up on our App</h3>
                <p>Set up your SafeDrive account in minutes.</p>
              </div>
              <hr className="bg-primary" />
            </div>

            <div className="timeline-end text-center mb-12">
              <div className="timeline-middle">
                <Car className="w-10 h-10 text-primary" />
              </div>
              <div className="timeline-start timeline-box">
                <h3 className="font-bold text-xl">Drive Safely</h3>
                <p>Our advanced tracking monitors your driving behavior.</p>
              </div>
              <hr className="bg-primary" />
            </div>

            <div className="timeline-start text-center mb-12">
              <div className="timeline-middle">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <div className="timeline-end timeline-box">
                <h3 className="font-bold text-xl">Earn Rewards</h3>
                <p>Convert safe driving into points, discounts, and cryptocurrency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              What Our <span className="text-primary">Drivers Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar placeholder mr-4">
                      <div className="bg-neutral text-neutral-content rounded-full w-16">
                        <span className="text-2xl">{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <input key={i} type="radio" className="mask mask-star-2 bg-orange-400" checked readOnly />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero bg-primary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">Ready to Drive Smarter?</h2>
            <p className="mb-6 text-xl">
              Join thousands of drivers who are earning rewards while staying safe on the road.
            </p>
            <div className="join w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered join-item w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                className="btn btn-accent join-item"
                onClick={() => {
                  /* Add email signup logic */
                }}
              >
                Start Now <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-base-200 text-base-content">
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of service</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
