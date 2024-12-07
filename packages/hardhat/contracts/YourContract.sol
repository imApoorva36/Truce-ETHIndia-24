pragma solidity >=0.8.0 <0.9.0;

contract YourContract {
    struct User {
        string name;
        string vehicleRegistrationNumber;
        address walletAddress;
        uint256 pendingFines;
    }

    struct Violation {
        uint256 time;
        string violationType;
        address reportedBy;
        bool isPaid;
        uint256 fineAmount;
    }

    mapping(address => User) public users;
    mapping(string => address) public vehicleToUser;
    mapping(address => Violation[]) userViolations;
    mapping(address => uint256) public finesPaid;
    mapping(string => uint256) public violationFines;

    event UserCreated(address indexed userAddress, string name, string vehicleRegistrationNumber);
    event ViolationReported(address indexed user, string violationType, address reportedBy, uint256 fineAmount);
    event FinePaid(address indexed user, uint256 violationIndex, uint256 amount);

    constructor() {
        // Initialize some dummy fine amounts for violation types
        violationFines["Speeding"] = 100;
        violationFines["Parking"] = 50;
        violationFines["Red Light"] = 200;
    }

    // Create a new user
    function createUser(string memory _name, string memory _vehicleRegistrationNumber) public {
        require(users[msg.sender].walletAddress == address(0), "User already exists");
        users[msg.sender] = User({
            name: _name,
            vehicleRegistrationNumber: _vehicleRegistrationNumber,
            walletAddress: msg.sender,
            pendingFines: 0
        });
        vehicleToUser[_vehicleRegistrationNumber] = msg.sender;
        emit UserCreated(msg.sender, _name, _vehicleRegistrationNumber);
    }

    // Report a violation
    function reportViolation(address _user, string memory _violationType) public {
        require(users[_user].walletAddress != address(0), "User does not exist");
        require(violationFines[_violationType] > 0, "Invalid violation type");

        uint256 fineAmount = violationFines[_violationType];
        userViolations[_user].push(Violation({
            time: block.timestamp,
            violationType: _violationType,
            reportedBy: msg.sender,
            isPaid: false,
            fineAmount: fineAmount
        }));
        users[_user].pendingFines++;
        emit ViolationReported(_user, _violationType, msg.sender, fineAmount);
    }

    // Fetch all violations of a user
    function getUserViolations(address _user) public view returns (Violation[] memory) {
        return userViolations[_user];
    }

    // Pay a fine
    function payFine(address _user, uint256 _violationIndex) public payable {
        require(users[_user].walletAddress != address(0), "User does not exist");
        require(_violationIndex < userViolations[_user].length, "Invalid violation index");
        require(!userViolations[_user][_violationIndex].isPaid, "Fine already paid");

        Violation storage violation = userViolations[_user][_violationIndex];
        require(msg.value == violation.fineAmount, "Payment must be equal to the fine amount");

        violation.isPaid = true;
        users[_user].pendingFines--;
        finesPaid[_user] += msg.value;
        emit FinePaid(_user, _violationIndex, msg.value);
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import '@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol';
import '@anon-aadhaar/contracts/interfaces/IAnonAadhaarVote.sol';

contract AnonAadhaarVote is IAnonAadhaarVote {
    string public votingQuestion;
    address public anonAadhaarVerifierAddr;

    // List of proposals
    Proposal[] public proposals;

    // Mapping to track if a userNullifier has already voted
    mapping(uint256 => bool) public hasVoted;

    // Constructor to initialize proposals
    constructor(
        string memory _votingQuestion,
        string[] memory proposalDescriptions,
        address _verifierAddr
    ) {
        anonAadhaarVerifierAddr = _verifierAddr;
        votingQuestion = _votingQuestion;
        for (uint256 i = 0; i < proposalDescriptions.length; i++) {
            proposals.push(Proposal(proposalDescriptions[i], 0));
        }
    }

    /// @dev Convert an address to uint256, used to check against signal.
    /// @param _addr: msg.sender address.
    /// @return Address msg.sender's address in uint256
    function addressToUint256(address _addr) private pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    /// @dev Check if the timestamp is more recent than (current time - 3 hours)
    /// @param timestamp: msg.sender address.
    /// @return bool
    function isLessThan3HoursAgo(uint timestamp) public view returns (bool) {
        return timestamp > (block.timestamp - 3 * 60 * 60);
    }

    /// @dev Register a vote in the contract.
    /// @param proposalIndex: Index of the proposal you want to vote for.
    /// @param nullifierSeed: Nullifier Seed used while generating the proof.
    /// @param nullifier: Nullifier for the user's Aadhaar data.
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @param signal: signal used while generating the proof, should be equal to msg.sender.
    /// @param revealArray: Array of the values used as input for the proof generation (equal to [0, 0, 0, 0] if no field reveal were asked).
    /// @param groth16Proof: SNARK Groth16 proof.
    function voteForProposal(
        uint256 proposalIndex,
        uint nullifierSeed,
        uint nullifier,
        uint timestamp,
        uint signal,
        uint[4] memory revealArray, 
        uint[8] memory groth16Proof
    ) public {
        require(
            proposalIndex < proposals.length,
            '[AnonAadhaarVote]: Invalid proposal index'
        );
        require(
            addressToUint256(msg.sender) == signal,
            '[AnonAadhaarVote]: wrong user signal sent.'
        );
        require(
            isLessThan3HoursAgo(timestamp) == true,
            '[AnonAadhaarVote]: Proof must be generated with Aadhaar data generated less than 3 hours ago.'
        );
        require(
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed, // nulifier seed
                nullifier,
                timestamp,
                signal,
                revealArray,
                groth16Proof
            ) == true,
            '[AnonAadhaarVote]: proof sent is not valid.'
        );
        // Check that user hasn't already voted
        require(
            !hasVoted[nullifier],
            '[AnonAadhaarVote]: User has already voted'
        );

        proposals[proposalIndex].voteCount++;
        hasVoted[nullifier] = true;

        emit Voted(msg.sender, proposalIndex);
    }

    // Function to get the total number of proposals
    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }

    // Function to get proposal information by index
    function getProposal(
        uint256 proposalIndex
    ) public view returns (string memory, uint256) {
        require(
            proposalIndex < proposals.length,
            '[AnonAadhaarVote]: Invalid proposal index'
        );

        Proposal memory proposal = proposals[proposalIndex];
        return (proposal.description, proposal.voteCount);
    }

    // Function to get the total number of votes across all proposals
    function getTotalVotes() public view returns (uint256) {
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < proposals.length; i++) {
            totalVotes += proposals[i].voteCount;
        }
        return totalVotes;
    }

    // Function to check if a user has already voted
    function checkVoted(uint256 _nullifier) public view returns (bool) {
        return hasVoted[_nullifier];
    }
}