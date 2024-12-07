from web3 import Web3
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get private key and wallet address from environment variables
private_key = os.getenv('PRIVATE_KEY')
wallet_address = os.getenv('WALLET_ADDRESS')

w3 = Web3(Web3.HTTPProvider('https://base-sepolia.g.alchemy.com/v2/KN7VMeVBxLD3UXb_TXuA7ZhUqg8d1B-q')) #fixed
address = "0x56fa932381d273B46D21dA571CED7Edf070dff1E" #fixed
abi = '''[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_verifierAddr",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "violationIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FinePaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "vehicleRegistrationNumber",
          "type": "string"
        }
      ],
      "name": "UserCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "violationType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "reportedBy",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fineAmount",
          "type": "uint256"
        }
      ],
      "name": "ViolationReported",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "anonAadhaarVerifierAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehicleRegistrationNumber",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "nullifierSeed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nullifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256[4]",
          "name": "revealArray",
          "type": "uint256[4]"
        },
        {
          "internalType": "uint256[8]",
          "name": "groth16Proof",
          "type": "uint256[8]"
        }
      ],
      "name": "createUser",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "finesPaid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserViolations",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "violationType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "area",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "reportedBy",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isPaid",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "fineAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Backend.Violation[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_violationIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nullifierSeed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nullifier",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256[4]",
          "name": "revealArray",
          "type": "uint256[4]"
        },
        {
          "internalType": "uint256[8]",
          "name": "groth16Proof",
          "type": "uint256[8]"
        }
      ],
      "name": "payFine",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_violationType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_area",
          "type": "string"
        }
      ],
      "name": "reportViolation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "vehicleRegistrationNumber",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "pendingFines",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "vehicleToUser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "violationFines",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]'''


contract_instance = w3.eth.contract(address=address, abi=abi)
nonce = w3.eth.get_transaction_count(wallet_address)  # Use the wallet address from env

def reporter(reg_num = "", violation = "Speeding", timestamp = 0, area = "Unknown"):
    tx = contract_instance.functions.reportViolation(reg_num, violation, timestamp, area).build_transaction({
        'chainId': 84532,
        'gas': 1500000,
        'maxFeePerGas': w3.to_wei('1000', 'wei'),
        'maxPriorityFeePerGas': w3.to_wei('1000', 'wei'),
        # 'nonce': nonce,
    })
    nonce = w3.eth.get_transaction_count(wallet_address)  # Update nonce dynamically
    tx['nonce'] = nonce

    signed_txn = w3.eth.account.sign_transaction(tx, private_key=private_key)
    res = w3.eth.send_raw_transaction(signed_txn.raw_transaction)  

    print(w3.to_hex(w3.keccak(signed_txn.raw_transaction)))

# Example usage
# reporter("ABC123", "Speeding")
