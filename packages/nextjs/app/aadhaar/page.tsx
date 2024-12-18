"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
// import { useWeb3Modal } from "@web3modal/wagmi/react";

const aadhaar: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  console.log(connectedAddress);

  const [anonAadhaar] = useAnonAadhaar();
//   const { isConnected, address } = useAccount();
//   const { open } = useWeb3Modal();
  const router = useRouter();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      router.push("./verified");
    }
  }, [anonAadhaar, router]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address: {connectedAddress}</p>
            {/* <Address address={connectedAddress} /> */}
          </div>

          <div className="flex w-full gap-8 mb-8">
            {/* <LaunchMode isTest={isTestMode} setIsTestMode={setIsTestMode} /> */}
            {/* {isConnected ? ( */}
              <LaunchProveModal
                nullifierSeed={Math.floor(Math.random() * 1983248)}
                signal={connectedAddress}
                buttonStyle={{
                  borderRadius: "8px",
                  border: "solid",
                  borderWidth: "1px",
                  boxShadow: "none",
                  fontWeight: 500,
                  borderColor: "#009A08",
                  color: "#009A08",
                  fontFamily: "rajdhani",
                }}
                // buttonTitle={
                //   isTestMode ? "USE TEST CREDENTIALS" : "USE REAL CREDENTIALS"
                // }
                />
            </div>

          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default aadhaar;