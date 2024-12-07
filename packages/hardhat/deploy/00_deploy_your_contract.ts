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
    args: [ANON_AADHAAR_VERIFIER],
    log: true,
    waitConfirmations: 1,
  });
  console.log(`🚀 Backend deployed at ${Backend.address}`);
};

export default deployBackend;
deployBackend.tags = ["Backend"];
