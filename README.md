# **Rule Zer0**

### _Incentivizing Safer Roads Through Web3 and AI_

---

## 📝 **Overview**

**Rule Zer0** is a decentralized platform designed to revolutionize traffic rule enforcement by creating a **self-sustaining rewards and fines ecosystem**. By combining blockchain, AI, and Web3 technologies, Rule Zer0 encourages drivers to follow traffic rules and penalizes those who don't, fostering safer roads and responsible driving.

---

## 🔗 **Core Components**

The frontend is built using <a href="https://scaffoldeth.io"**Scaffold-ETH**</a>.

### 🔗 **Smart Contract**

- Deployed on **Base Sepolia** testnet at contract address:  
  `0x...`
- Supports:
  - User management via **Anon Aadhaar** (sign-in with Aadhaar Card or Driver's License).
  - Storing violations, rewards, and payment statuses.
  - Automated reward distribution.
  - Fine payments and reward redemption.

### 🐍 **Python Automation Script**

- Automates the AI agent’s processes:
  - Fetches data from the smart contract.
  - Analyzes user violations.
  - Updates the contract with reward points based on the reward distribution logic.

### 🧠 **Galadriel AI Agent**

- **Galadriel** is an AI agent that analyzes data from the smart contract, including violations and user behavior.
- The agent generates:
  - Responses based on driving patterns.
  - Reward amounts personalized to each driver.
  - Updates to user points in the smart contract based on predefined reward distribution rules.

### 💻 **Frontend**

- Provides end-to-end support for:
  - Viewing traffic violations.
  - Paying fines using:
    - **Coinbase Wallet** for UPI-to-crypto transactions.
    - An on-platform wallet.
  - Checking rewards and exchanging them for alternatives.
  - Viewing the **leaderboard** based on driver points.
  - Searching for user profiles.

---

## **How Rule Zer0 Works**

1. **User Registration**  
   Users sign in using **Anon Aadhaar** (via Aadhaar Card or Driver's License).

2. **Violations & Penalties**  
   When a traffic rule is violated, the violation is reported and logged in the smart contract.

3. **Reward System**  
   The AI agent (Galadriel) evaluates user behavior and determines rewards based on the following rules:

   - **Less Violations Recently** ➡️ Slightly More Rewards.
   - **Improved Frequent Defaulters** ➡️ Bonus Rewards.
   - **Consistent Good Drivers** ➡️ Average Rewards.
   - **Frequent Violators** ➡️ No Rewards.
   - **Increased Violation Frequency** ➡️ Low Rewards.
   - **Unpaid Fines** ➡️ Rewards Capped at 8%.

4. **Payment of Fines**  
   Fines can be paid using:

   - **Coinbase Wallet** (UPI-to-crypto).
   - **On-platform wallet** for direct payments.

5. **Reward Redemption**  
   Users can view and redeem their rewards for:
   - Alternative incentives (e.g., coupons, discounts).
   - Clearing fines with reward points.

---

## 📊 **Features**

1. **🪪 Anon Aadhaar Sign-In**

   - Secure, decentralized login using Aadhaar Card or Driver's License.

2. **🚦 Violation Tracking**

   - Real-time logging and display of traffic violations.

3. **💰 Fine Payments**

   - Pay fines seamlessly with crypto or UPI via Coinbase Wallet.

4. **🏆 Rewards System**

   - Earn rewards for responsible driving.
   - Exchange points for incentives or use them to clear fines.

5. **📈 Leaderboard**

   - Compete with other drivers and track your performance.

6. **🔍 Profile Search**
   - Search and view driver profiles and violation history.

---

## 🛠️ **Technologies Used**

- **Frontend**: Next.js, DaisyUI, TailwindCSS
- **Backend**: Hardhat (Smart Contract Development)
- **Blockchain**: Solidity, Base Sepolia Testnet
- **AI**: Python-based automation with Galadriel AI agent
- **Wallet Integration**: Rainbox Kit, Metamask, Coinbase Wallet, Ledger, Brave Wallet
- **Identity Verification**: Anon Aadhaar

---

## 🚀 **Getting Started**

### Prerequisites

1. **Node.js** (v14+)
2. **Hardhat**
   ```bash
   npm install --save-dev hardhat
   ```
3. **Python** (for AI automation script)
4. **Coinbase Wallet** for transactions.

### Smart Contract Deployment

1. Clone the repository:

   ```bash
   git clone https://github.com/imApoorva36/Truce-ETHIndia-24.git
   cd Truce-ETHIndia-24
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Deploy the contract to **Base Sepolia**:
   ```bash
   yarn deploy --network baseSepolia
   ```

### Frontend Setup

1. Start the frontend:

   ```bash
   yarn start
   ```

2. Open the app in your browser:
   ```
   http://localhost:3000
   ```

### Python Script (AI Automation)

1. Install Python dependencies:

   ```bash
   pip install web3 requests
   ```

2. Run the AI automation script:
   ```bash
   python ai_agent.py
   ```

---

## 📜 **Reward Distribution Logic**

The rewards are distributed based on these principles:

1. **Recent Improvement**:  
   More rewards for drivers showing improvement.
2. **Consistent Violators**:  
   Zero rewards for continuous defaulters.
3. **Good Drivers**:  
   Average rewards for consistently good drivers.
4. **Unpaid Fines**:  
   Rewards capped at 8% if fines are unpaid.

---

## 🤝 **Contributing**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push and create a pull request.

---

## 🔒 **License**

This project is licensed under the **MIT License**.
