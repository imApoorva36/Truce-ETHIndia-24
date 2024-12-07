/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  84532: {
    AnonAadhaarVote: {
      address: "0x0597830Bf4809DDa7A8bA6A89e31EcbFB5eb181c",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "_votingQuestion",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "proposalDescriptions",
              type: "string[]",
            },
            {
              internalType: "address",
              name: "_verifierAddr",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "_propositionIndex",
              type: "uint256",
            },
          ],
          name: "Voted",
          type: "event",
        },
        {
          inputs: [],
          name: "anonAadhaarVerifierAddr",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_nullifier",
              type: "uint256",
            },
          ],
          name: "checkVoted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "proposalIndex",
              type: "uint256",
            },
          ],
          name: "getProposal",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getProposalCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getTotalVotes",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "hasVoted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "isLessThan3HoursAgo",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "proposals",
          outputs: [
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "voteCount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "proposalIndex",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierSeed",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifier",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256[4]",
              name: "revealArray",
              type: "uint256[4]",
            },
            {
              internalType: "uint256[8]",
              name: "groth16Proof",
              type: "uint256[8]",
            },
          ],
          name: "voteForProposal",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "votingQuestion",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    Backend: {
      address: "0xE0d56d7238F7C738f971FA09818EBCa2a57d862f",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_verifierAddr",
              type: "address",
            },
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_pubkeyHash",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "violationIndex",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "FinePaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "newRewardBalance",
              type: "uint256",
            },
          ],
          name: "RewardUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "vehicleRegistrationNumber",
              type: "string",
            },
          ],
          name: "UserCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "violationType",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "reportedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fineAmount",
              type: "uint256",
            },
          ],
          name: "ViolationReported",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "allUsers",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "anonAadhaarVerifierAddr",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "convertPointsToRewards",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_basename",
              type: "string",
            },
            {
              internalType: "string",
              name: "_vehicleRegistrationNumber",
              type: "string",
            },
            {
              internalType: "string",
              name: "_vehicleType",
              type: "string",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "nullifierSeed1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nullifier1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256[4]",
                  name: "revealArray",
                  type: "uint256[4]",
                },
                {
                  internalType: "uint256[8]",
                  name: "groth16Proof1",
                  type: "uint256[8]",
                },
              ],
              internalType: "struct Backend.CreateUserParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "createUser",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "finesPaid",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllUsersAndPoints",
          outputs: [
            {
              internalType: "string[]",
              name: "basenames",
              type: "string[]",
            },
            {
              internalType: "uint256[]",
              name: "points",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getContractBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getMyRewards",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_walletAddress",
              type: "address",
            },
          ],
          name: "getUserDetailsByAddress",
          outputs: [
            {
              internalType: "string",
              name: "basename",
              type: "string",
            },
            {
              internalType: "string",
              name: "vehicleNumber",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "getUserViolations",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "time",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "violationType",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "area",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "reportedBy",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "isPaid",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "fineAmount",
                  type: "uint256",
                },
              ],
              internalType: "struct Backend.Violation[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_violationIndex",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierSeed",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifier",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256[4]",
              name: "revealArray",
              type: "uint256[4]",
            },
            {
              internalType: "uint256[8]",
              name: "groth16Proof",
              type: "uint256[8]",
            },
          ],
          name: "payFine",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "string",
              name: "_violationType",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_timestamp",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_area",
              type: "string",
            },
          ],
          name: "reportViolation",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "storedPublicKeyHash",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalRewardPool",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_points",
              type: "uint256",
            },
          ],
          name: "updatePoints",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_newReward",
              type: "uint256",
            },
          ],
          name: "updateUserReward",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "string",
              name: "basename",
              type: "string",
            },
            {
              internalType: "string",
              name: "vehicleRegistrationNumber",
              type: "string",
            },
            {
              internalType: "string",
              name: "vehicleType",
              type: "string",
            },
            {
              internalType: "address",
              name: "walletAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "pendingFines",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rewardBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "points",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "vehicleToUser",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "verifier",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "violationFines",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    YourContract: {
      address: "0x7C3CfCa493172265A60E922E9dEFA6C08cfde2ae",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_verifierAddr",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "violationIndex",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "FinePaid",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "vehicleRegistrationNumber",
              type: "string",
            },
          ],
          name: "UserCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "violationType",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "reportedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fineAmount",
              type: "uint256",
            },
          ],
          name: "ViolationReported",
          type: "event",
        },
        {
          inputs: [],
          name: "anonAadhaarVerifierAddr",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_vehicleRegistrationNumber",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "nullifierSeed",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifier",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256[4]",
              name: "revealArray",
              type: "uint256[4]",
            },
            {
              internalType: "uint256[8]",
              name: "groth16Proof",
              type: "uint256[8]",
            },
          ],
          name: "createUser",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "finesPaid",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "getUserViolations",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "time",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "violationType",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "area",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "reportedBy",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "isPaid",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "fineAmount",
                  type: "uint256",
                },
              ],
              internalType: "struct YourContract.Violation[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_violationIndex",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifierSeed",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nullifier",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256[4]",
              name: "revealArray",
              type: "uint256[4]",
            },
            {
              internalType: "uint256[8]",
              name: "groth16Proof",
              type: "uint256[8]",
            },
          ],
          name: "payFine",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "string",
              name: "_violationType",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_timestamp",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_area",
              type: "string",
            },
          ],
          name: "reportViolation",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "vehicleRegistrationNumber",
              type: "string",
            },
            {
              internalType: "address",
              name: "walletAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "pendingFines",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "vehicleToUser",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "violationFines",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
