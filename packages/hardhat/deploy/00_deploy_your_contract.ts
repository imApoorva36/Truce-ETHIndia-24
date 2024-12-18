import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const ANON_AADHAAR_VERIFIER = "0xC4C4d6c21F1D8e4591a69f7662b6EcE0f2f0E61b";

const deployBackend: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("\n📡 Deploying...\n");

  // Deploy main contract with existing verifier address
  const Backend = await deploy("Backend", {
    from: deployer,
    args: [ANON_AADHAAR_VERIFIER, '0x6E1c757A9E94f5D78c053A0d5Dd6854619095B88', '7159552241047614681013946344274430157054820687880791674287250194862110506098'],
    log: true,
    waitConfirmations: 1,
  });
  console.log(`🚀 Backend deployed at ${Backend.address}`);
};

export default deployBackend;
deployBackend.tags = ["Backend"];
