pragma solidity >=0.8.0 <0.9.0;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";
import "@anon-aadhaar/contracts/interfaces/IAnonAadhaarVote.sol";
import "../interfaces/IAnonDigiLockerGroth16Verifier.sol";
import "../interfaces/IAnonDigiLocker.sol";

contract Backend {
    address public anonAadhaarVerifierAddr;
    address public verifier;
    uint256 public immutable storedPublicKeyHash;
    address[] public allUsers; // Array to track all user addresses
    struct User {
        string basename;
        string vehicleRegistrationNumber;
        string vehicleType;
        address walletAddress; // keep only this one
        uint256 pendingFines;
        uint256 rewardBalance;
        uint256 points; // Added points field
    }

    struct Violation {
        uint256 time;
        string violationType;
        string area; // Add area field
        address reportedBy;
        bool isPaid;
        uint256 fineAmount;
    }

    struct CreateUserParams {
        uint256 nullifierSeed1;
        uint256 nullifier1;
        uint256 timestamp;
        uint256[4] revealArray;
        uint256[8] groth16Proof1;
        // uint256 nullifier2;
        // uint256 nullifierSeed2;
        // uint256 documentType;
        // uint256 reveal;
        // uint256 signal;
        // uint256[8] groth16Proof2;
    }

    uint256 public totalRewardPool;
    uint256 public totalpoints;
    mapping(address => User) public users;
    mapping(string => address) public vehicleToUser;
    mapping(address => Violation[]) userViolations;
    mapping(address => uint256) public finesPaid;
    mapping(string => uint256) public violationFines;

    event UserCreated(address indexed userAddress, string name, string vehicleRegistrationNumber);
    event RewardUpdated(address indexed user, uint256 newRewardBalance);
    event ViolationReported(address indexed user, string violationType, address reportedBy, uint256 fineAmount);
    event FinePaid(address indexed user, uint256 violationIndex, uint256 amount);

    constructor(address _verifierAddr, address _verifier, uint256 _pubkeyHash) {
        verifier = _verifier;
        // Initialize some dummy fine amounts for violation types
        anonAadhaarVerifierAddr = _verifierAddr;
        storedPublicKeyHash = _pubkeyHash;
        violationFines["Speeding"] = 80;
        violationFines["Parking"] = 40;
        violationFines["Red Light"] = 60;
        violationFines["Wrong way"] = 90;
        totalRewardPool = 1000; // Initialize with 1000
        totalpoints = 0;
    }

    // ---------------------- REWARDS SYSTEM FUNCTIONS ----------------------

    // Function to add to the total reward pool
    function addUserReward(address _user, uint256 _newReward) public {
        require(users[_user].walletAddress != address(0), "User does not exist");

        users[_user].rewardBalance += _newReward;
        emit RewardUpdated(_user, _newReward);
    }

    // Function to fetch a user's reward balance
    function getMyRewards() public view returns (uint256) {
        User storage user = users[msg.sender];
        return user.rewardBalance;
    }

    function addressToUint256(address _addr) private pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    function _hash(uint256 message) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(message))) >> 3;
    }

    function verifyAnonAadhaar(
        uint256 nullifierSeed,
        uint256 nullifier,
        uint256 timestamp,
        uint256[4] memory revealArray,
        uint256[8] memory groth16Proof
    ) internal returns (bool) {
        return
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed,
                nullifier,
                timestamp,
                addressToUint256(msg.sender),
                revealArray,
                groth16Proof
            );
    }

    function verifyDigiLocker(
        uint256[8] memory proof,
        uint256 nullifier,
        uint256 documentType,
        uint256 reveal,
        uint256 nullifierSeed,
        uint256 signal
    ) internal view returns (bool) {
        uint256 signalHash = _hash(signal);
        return
            IAnonDigiLockerGroth16Verifier(verifier).verifyProof(
                [proof[0], proof[1]],
                [[proof[2], proof[3]], [proof[4], proof[5]]],
                [proof[6], proof[7]],
                [storedPublicKeyHash, nullifier, documentType, reveal, nullifierSeed, signalHash]
            );
    }

    // Create a new user
    function createUser(
        string memory _basename,
        string memory _vehicleRegistrationNumber,
        string memory _vehicleType,
        CreateUserParams memory params // removed _userAddress parameter
    ) public payable {
        require(users[msg.sender].walletAddress == address(0), "User already exists");

        bool isValid = verifyAnonAadhaar(
            params.nullifierSeed1,
            params.nullifier1,
            params.timestamp,
            params.revealArray,
            params.groth16Proof1
        );
        require(isValid, "[AnonAadhaarVote]: proof sent is not valid.");

        // bool isValid2 = verifyDigiLocker(
        //     params.groth16Proof2,
        //     params.nullifier2,
        //     params.documentType,
        //     params.reveal,
        //     params.nullifierSeed2,
        //     params.signal
        // );
        // require(isValid || isValid2, 'Proof sent is not valid.');
        // require(isValid2, '[AnonAadhaarVote]: DL Proof sent is not valid.');

        users[msg.sender] = User({
            basename: _basename,
            vehicleRegistrationNumber: _vehicleRegistrationNumber,
            vehicleType: _vehicleType,
            walletAddress: msg.sender,
            pendingFines: 0,
            rewardBalance: 0,
            points: 100 // Start with 100 points
        });
        allUsers.push(msg.sender); // Add this line after creating new user
        vehicleToUser[_vehicleRegistrationNumber] = msg.sender;
        totalpoints += 100;
        emit UserCreated(msg.sender, _basename, _vehicleRegistrationNumber);
    }

    // Report a violation
    function reportViolation(
        address _user,
        string memory _violationType,
        uint256 _timestamp,
        string memory _area
    ) public {
        require(users[_user].walletAddress != address(0), "User does not exist");
        require(violationFines[_violationType] > 0, "Invalid violation type");
        require(_timestamp <= block.timestamp, "Invalid timestamp");

        uint256 fineAmount = violationFines[_violationType];
        userViolations[_user].push(
            Violation({
                time: _timestamp,
                violationType: _violationType,
                area: _area,
                reportedBy: msg.sender,
                isPaid: false,
                fineAmount: fineAmount
            })
        );
        users[_user].pendingFines++;
        emit ViolationReported(_user, _violationType, msg.sender, fineAmount);
    }

    // Fetch all violations of a user
    function getUserViolations(address _user) public view returns (Violation[] memory) {
        return userViolations[_user];
    }

    // Pay a fine
    function payFine(
        address _user,
        uint256 _violationIndex,
        uint256 nullifierSeed,
        uint256 nullifier,
        uint256 timestamp,
        uint256[4] memory revealArray,
        uint256[8] memory groth16Proof
    ) public payable {
        require(users[_user].walletAddress != address(0), "User does not exist");
        require(!userViolations[_user][_violationIndex].isPaid, "Fine already paid");
        bool isValid = IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
            nullifierSeed,
            nullifier,
            timestamp,
            addressToUint256(msg.sender),
            revealArray,
            groth16Proof
        );
        require(isValid, "[AnonAadhaarVote]: proof sent is not valid.");

        Violation storage violation = userViolations[_user][_violationIndex];
        require(msg.value == violation.fineAmount, "Payment must be equal to the fine amount");

        violation.isPaid = true;
        users[_user].pendingFines--;
        finesPaid[_user] += msg.value;
        totalRewardPool += msg.value; // Add fine amount to total reward pool
        emit FinePaid(_user, _violationIndex, msg.value);
    }

    function addPoints(string memory _basename, uint256 _points) public {
        address userAddress;
        for (uint i = 0; i < allUsers.length; i++) {
            if (keccak256(bytes(users[allUsers[i]].basename)) == keccak256(bytes(_basename))) {
                userAddress = allUsers[i];
                break;
            }
        }
        require(userAddress != address(0), "User not found");
        
        users[userAddress].points += _points;
        totalpoints += _points;
    }

    function convertPointsToRewards() public {
        User storage user = users[msg.sender];
        require(user.points > 0, "No points to convert");
        require(totalRewardPool > 0, "Reward pool is empty");
        require(totalpoints > 0, "No points in the system");

        // Calculate user's share of the reward pool
        uint256 rewardShare = (user.points * totalRewardPool) / totalpoints;

        // Ensure contract has enough Ether
        require(address(this).balance >= rewardShare, "Not enough funds in contract to pay rewards");

        // Transfer reward to the user's wallet
        (bool success, ) = msg.sender.call{ value: rewardShare }("");
        require(success, "Reward transfer failed");

        // Update user's internal balances
        user.rewardBalance += rewardShare; // For internal tracking
        totalpoints-=user.points;
        user.points = 0; // Reset points after conversion
        totalRewardPool -= rewardShare;

        emit RewardUpdated(msg.sender, user.rewardBalance);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getUserDetailsByAddress(
        address _walletAddress
    ) public view returns (
        string memory basename,
        string memory vehicleNumber,
        string memory vehicleType,
        uint256 pendingFines,
        uint256 rewardBalance,
        uint256 points
    ) {
        require(users[_walletAddress].walletAddress != address(0), "User does not exist");
        User memory user = users[_walletAddress];
        return (
            user.basename,
            user.vehicleRegistrationNumber,
            user.vehicleType,
            user.pendingFines,
            user.rewardBalance,
            user.points
        );
    }

    function getUserDetailsByBasename(
        string memory _basename
    ) public view returns (
        string memory basename,
        string memory vehicleNumber,
        string memory vehicleType,
        address walletAddress,
        uint256 pendingFines,
        uint256 rewardBalance,
        uint256 points
    ) {
        address userAddress;
        for (uint i = 0; i < allUsers.length; i++) {
            if (keccak256(bytes(users[allUsers[i]].basename)) == keccak256(bytes(_basename))) {
                userAddress = allUsers[i];
                break;
            }
        }
        require(userAddress != address(0), "User not found");
        
        User memory user = users[userAddress];
        return (
            user.basename,
            user.vehicleRegistrationNumber,
            user.vehicleType,
            user.walletAddress,
            user.pendingFines,
            user.rewardBalance,
            user.points
        );
    }

    function getAllUsersAndPoints()
        public
        view
        returns (
            string[] memory basenames, // changed from usernames to basenames
            uint256[] memory points
        )
    {
        uint256 totalUsers = allUsers.length;
        basenames = new string[](totalUsers); // changed variable name
        points = new uint256[](totalUsers);

        for (uint256 i = 0; i < totalUsers; i++) {
            address userAddress = allUsers[i];
            basenames[i] = users[userAddress].basename; // changed variable name
            points[i] = users[userAddress].points;
        }

        return (basenames, points); // changed return variable name
    }

    function getUserPoints(address _userAddress) public view returns (uint256) {
        require(users[_userAddress].walletAddress != address(0), "User does not exist");
        return users[_userAddress].points;
    }

    struct UserViolationInfo {
        address userAddress;
        string basename;
        Violation[] violations;
    }

    function getAllUsersAndViolations() public view returns (UserViolationInfo[] memory) {
        uint256 totalUsers = allUsers.length;
        UserViolationInfo[] memory allUserInfo = new UserViolationInfo[](totalUsers);

        for (uint256 i = 0; i < totalUsers; i++) {
            address userAddr = allUsers[i];
            allUserInfo[i] = UserViolationInfo({
                userAddress: userAddr,
                basename: users[userAddr].basename,
                violations: userViolations[userAddr]
            });
        }

        return allUserInfo;
    }

    // Add this new function for daily points update
    function addDailyPoints() public {
        uint256 totalUsers = allUsers.length;
        for (uint256 i = 0; i < totalUsers; i++) {
            address userAddr = allUsers[i];
            if (users[userAddr].pendingFines == 0) {
                users[userAddr].points += 10;
            }
        }
    }
}
