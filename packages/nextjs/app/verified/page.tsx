'use client'
import { useAnonAadhaar, useProver } from "@anon-aadhaar/react";
import {
  AnonAadhaarCore,
  deserialize,
  packGroth16Proof,
} from "@anon-aadhaar/core";
import { useEffect, useState, useContext } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export default function Vote() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [anonAadhaarCore, setAnonAadhaarCore] = useState<AnonAadhaarCore>();

  const { writeContractAsync: contract } = useScaffoldWriteContract("AnonAadhaarVote");

  const { address: connectedAddress } = useAccount();
  const sendVote = async () => {
    if (!anonAadhaarCore)
      return
    const packedGroth16Proof = packGroth16Proof(
        anonAadhaarCore.proof.groth16Proof
    );
    try {
        const proofarray = [
            BigInt(packedGroth16Proof[0]),
            BigInt(packedGroth16Proof[1]),
            BigInt(packedGroth16Proof[2]),
            BigInt(packedGroth16Proof[3]),
            BigInt(packedGroth16Proof[4]),
            BigInt(packedGroth16Proof[5]),
            BigInt(packedGroth16Proof[6]),
            BigInt(packedGroth16Proof[7]),
        ] as readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]
        console.log(proofarray);
        console.log([
            BigInt(0),
            BigInt(anonAadhaarCore.proof.nullifierSeed),
            BigInt(anonAadhaarCore.proof.nullifier),
            BigInt(anonAadhaarCore.proof.timestamp),
            [
              BigInt(anonAadhaarCore.proof.ageAbove18),
              BigInt(anonAadhaarCore.proof.gender),
              BigInt(anonAadhaarCore.proof.pincode),
              BigInt(anonAadhaarCore.proof.state),
            ],
            [
                BigInt(packedGroth16Proof[0]),
                BigInt(packedGroth16Proof[1]),
                BigInt(packedGroth16Proof[2]),
                BigInt(packedGroth16Proof[3]),
                BigInt(packedGroth16Proof[4]),
                BigInt(packedGroth16Proof[5]),
                BigInt(packedGroth16Proof[6]),
                BigInt(packedGroth16Proof[7]),
            ],
          ]);
      const voteTx = await contract({
        functionName: "voteForProposal",
        args: [
            BigInt(0),
            BigInt(anonAadhaarCore.proof.nullifierSeed),
            BigInt(anonAadhaarCore.proof.nullifier),
            BigInt(anonAadhaarCore.proof.timestamp),
            [
              BigInt(anonAadhaarCore.proof.ageAbove18),
              BigInt(anonAadhaarCore.proof.gender),
              BigInt(anonAadhaarCore.proof.pincode),
              BigInt(anonAadhaarCore.proof.state),
            ],
            [
                BigInt(packedGroth16Proof[0]),
                BigInt(packedGroth16Proof[1]),
                BigInt(packedGroth16Proof[2]),
                BigInt(packedGroth16Proof[3]),
                BigInt(packedGroth16Proof[4]),
                BigInt(packedGroth16Proof[5]),
                BigInt(packedGroth16Proof[6]),
                BigInt(packedGroth16Proof[7]),
            ],
          ],
      });
      console.log("Vote tx:", voteTx);
    } catch (e) {
      console.error("Error verifying:", e);
    }
  };

  useEffect(() => {
    // To do: fix the hook in the react lib
    const aaObj = localStorage.getItem("anonAadhaar");
    const anonAadhaarProofs = JSON.parse(aaObj!).anonAadhaarProofs;

    deserialize(
      anonAadhaarProofs[Object.keys(anonAadhaarProofs).length - 1].pcd
    ).then((result) => {
      console.log(result);
      setAnonAadhaarCore(result);
    });
  }, [anonAadhaar, latestProof]);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={sendVote}
        >
        Verify
        </button>
    </>
  );
}