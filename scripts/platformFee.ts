const { ethers } = require("hardhat");
import config from "./config.json";

const main = async (contractAddress: string, contractName: string) => {
  const NFT = await ethers.getContractAt(contractName, contractAddress);
  console.log("NFT contract deployed at:", NFT.target);

  // Interact with the contract
  const platformFee = await NFT.platformFee();
  console.log("Platform Fee:", platformFee.toString());
}

main(config.contractAddress, config.contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat node
  // npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network localhost
  // npx hardhat run --network localhost scripts/platformFee.ts