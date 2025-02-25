// setPlatformFee.ts
const { ethers } = require("hardhat");
import config_local from "./config_local.json";
import config_sepolia from "./config_sepolia.json";

const config = config_local;

const main = async (contractAddress: string, contractName: string) => {
  const NFT = await ethers.getContractAt(contractName, contractAddress);
  console.log("NFT contract deployed at:", NFT.target);

  const newPlatformFee = ethers.parseEther("0.003");
  const platformFeeReturned = await NFT.setPlatformFee(newPlatformFee);
  const platformFee = await NFT.platformFee();
  console.log("Platform Fee:", platformFee.toString());

  console.log("New platform Fee:", platformFee.toString());
};

main(config.contractAddress, config.contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat node
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network localhost
// npx hardhat run --network localhost scripts/setPlatformFee.ts
