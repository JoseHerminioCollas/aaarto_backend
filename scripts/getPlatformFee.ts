// getPlatformFee.ts
const { ethers } = require("hardhat");
import config_local from "./config_local.json";
import config_polgon from "./config_polygon.json";

const config = config_polgon;

const main = async (contractAddress: string, contractName: string) => {
  const NFT = await ethers.getContractAt(contractName, contractAddress);
  console.log("NFT contract deployed at:", NFT.target);

  // Interact with the contract
  const platformFee = await NFT.platformFee();
  console.log("Platform Fee:", platformFee.toString());
};

main(config.contractAddress, config.contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat node
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network localhost
// npx hardhat run --network polygon scripts/getPlatformFee.ts

// sepolia
// 0x96de1d7b02363Ff5b6F719791363189e4E629098
// "contractName": "AaartoNFTV4",

// local net
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
//   "contractName": "AaartoNFTV4",
