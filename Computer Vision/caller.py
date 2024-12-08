import json
import os
import google.generativeai as genai
from web3 import Web3
from openai import OpenAI
import re
from time import sleep
# ---------- CONFIGURATION ----------

# Load environment variables for sensitive data


# ABI of the contract (must match the deployed contract)
with open("abi.json") as abi_file:
    CONTRACT_ABI = json.load(abi_file)

# Gemini API Key configuration
# genai.configure(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyALyPlFwcANignvjYgiho4hqGCcC7h9_RY"))

# ---------- CONNECT TO ETHEREUM NETWORK ----------

w3 = Web3(Web3.HTTPProvider(INFURA_URL))
if w3.is_connected():
    print("Connected to Ethereum Network.")
else:
    raise ConnectionError("Failed to connect to Ethereum Network.")

# ---------- SMART CONTRACT INSTANCE ----------

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

# ---------- FETCH USER DETAILS ----------

def fetch_user_details(user_address):
    try:
        # Fetch user details
        user_details = contract.functions.getAllUsersAndViolations().call()
        
        # # Fetch violations
        # violations = contract.functions.getUserViolations(user_address).call()
        
        # # Fetch user points and rewards
        # all_users, all_points = contract.functions.getAllUsersAndPoints().call()
        # user_index = all_users.index(user_details[0]) if user_details[0] in all_users else -1
        
        # # Fetch contract balance and total reward pool
        # contract_balance = contract.functions.getContractBalance().call()
        # user_rewards = contract.functions.getMyRewards().call()
        
        # return {
        #     "basename": user_details[0],
        #     "vehicleNumber": user_details[1],
        #     "points": all_points[user_index] if user_index != -1 else 0,
        #     "violations": violations,
        #     "contract_balance": contract_balance,
        #     "current_rewards": user_rewards
        # }
        return user_details
    except Exception as e:
        print(f"Error fetching user details: {e}")
        return None

# ---------- CALL LLM FOR REWARD CALCULATION ----------

# def get_llm_response(user_details):
    # Initialize Gemini model
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Construct detailed prompt with comprehensive user and contract data
    prompt = f"""You are an AI agent responsible for calculating fair rewards for drivers based on their compliance and performance.

Contract and Reward Pool Context:
- Total Contract Balance: ${user_details['contract_balance']}
- Available Reward Pool: $1000

User Profile:
- Name/Identifier: {user_details['basename']}
- Vehicle Registration: {user_details['vehicleNumber']}
- Current Points: {user_details['points']}
- Current Reward Balance: ${user_details['current_rewards']}

Violation History:
{json.dumps(user_details['violations'], indent=2)}

Reward Calculation Rules:
1. Reward calculation based on:
   a) Points accumulated
   b) Violation history
   c) Current reward balance
2. Ensure minimum reward of $10
3. Penalize based on violation severity
4. Proportional reward distribution

Tasks:
1. Calculate fair reward amount
2. Justify reward calculation
3. Recommend points allocation
4. Suggest future compliance improvements

Provide a precise response with:
- Calculated Reward Amount
- Points Management

Response Format:
```
Reward Calculation:
- Base Reward: $X
- Penalty Deductions: $Y
- Net Reward: $Z

Points Management:
- Current Points: A
- Points Earned/Deducted: B
- Recommended Points: C
```"""

    try:
        # Generate response using Gemini
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return "Error generating reward calculation."


#------------ Galadirel integration ------------

def extract_json(data):
    # Use regex to find the JSON-like structure
    json_match = re.search(r'\[.*?\]', data, re.DOTALL)
    
    if json_match:
        try:
            # Parse the matched JSON string
            parsed_json = json.loads(json_match.group(0))
            return parsed_json
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return None
    else:
        print("No JSON found in the string")
        return None

def get_galadirel_response(user_details):

    system_prompt = '''
    You are a seasoned rewarding agent, experienced in rewarding optimally to incentivize drivers to follow rules based on their performance. You are deployed to distribute rewards from rewards pool to drivers such that they get encouraged to follow rules.

    Your have to look at the given input details of each driver which contains all the violations made till date in form of dictionary.

    Input Format:
    1. User Details Dictionary

    Output Format:
    1. json indicating every user basename and reward percentage distribution.
    2. Explanation for distribution.

    Instructions to distribute rewards:
    1. If the driver is making lesser violations in recent times than older, he will be given slightly more rewards.
    2. If a driver is very frequent defaulter and looks like he improved in recent times, he gets slightly more percentage of rewards.
    3. If a driver is a good driver, with very less violations, he always gets an average share of rewards pool.
    4. If a person is continuously violating rules very frequently, he gets 0 reward. 
    5. If a person's violations' frequency increases, he gets very low reward.
    6. If a person has unpaid fines, which will be indicated by an "isPaid" field being false, then the person will not get reward more than 8%.
    7. Any other rules relevant to the context.

    Sample Input:
    1.[
    {
        "userAddress": "0x5a4983927dCEe4aF40E5829Eb890698e63C9e3ce",
        "basename": "avatar",
        "violations": [
        {
            "time": 1212121,
            "violationType": "Parking",
            "area": "idk",
            "reportedBy": "0x5a4983927dCEe4aF40E5829Eb890698e63C9e3ce",
            "isPaid": false,
            "fineAmount": 40
       }
        ]
      }
    ]

    Output:
    1. 
    [
    {
        "basename" : "avatar",
        "reward" : "10%"
    }
    ]
    2. Since only one user exists and has very recent violations, he has been given low rewards.

    '''

    user_prompt = f'''
    Given the user details: 
    {user_details}
    Calculate the rewards for each user and provide a concise explanation for the reward distribution. FOLLOW THE SAMPLE OUTPUT FORMAT STRICTLY. AVOID REPEATING THE INPUT DETAILS IN THE OUTPUT.
    '''

    client = OpenAI(
        base_url="https://api.galadriel.com/v1",
        api_key="gal-Bs03cv3QNPmVJdqc-8IwVgXZzuxEts0hGrV4cs9RW1yaIVEU",
    )

    completion = client.chat.completions.create(
        model="llama3.1:70b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    answer = completion.choices[0].message.content
    print(answer)
    data = extract_json(answer)
    return data

# ---------- LOG REWARD DISTRIBUTION ----------


def transact_reward(llm_response):
    # Fetch the total reward pool
    total_reward_pool = contract.functions.totalRewardPool().call()

    # Parse the JSON response
    # reward_data = json.loads(llm_response)
    reward_data = llm_response

    nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)
    # Iterate through each basename and calculate points
    for data in reward_data:
        
        points = total_reward_pool * (float(data["reward"][:-1]) / 100)

        # Make a transaction to the contract
        
        tx = contract.functions.addPoints(data['basename'], int(points)).build_transaction({
            'chainId': 84532,
            'gas': 6000000,
            'maxFeePerGas': w3.to_wei('1000', 'wei'),
            'maxPriorityFeePerGas': w3.to_wei('1000', 'wei'),
            # 'nonce': nonce,
        })

        sleep(3)
        nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)  # Update nonce dynamically
        tx['nonce'] = nonce

        # Sign the transaction
        signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)

        # Send the transaction
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        print(f'Transaction sent: {tx_hash.hex()}')
    
    
    

# ---------- MAIN FUNCTION ----------

def main():
    # Get user address input
    user_address = WALLET_ADDRESS

    # Fetch comprehensive user details
    user_details = fetch_user_details(user_address)
    
    if not user_details:
        print("Could not retrieve user details.")
        return

    # Generate LLM response for reward calculation
    # llm_response = get_llm_response(user_details)
    llm_response = get_galadirel_response(user_details)
    print("Reward Calculation Response:")
    print(llm_response)

    # Log reward distribution on blockchain
    transact_reward(llm_response)

if __name__ == "__main__":
    main()