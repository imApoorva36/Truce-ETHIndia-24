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
