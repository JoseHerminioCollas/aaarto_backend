// checkFeeRecipient.ts
import { ethers } from 'hardhat';
import config from "./config.json";

const main = async (contractAddress: string, contractName: string) => {
  console.log('Contract address:', contractAddress);
  console.log('Contract name:', contractName);
  const NFT = await ethers.getContractAt("AaartoNFTV4", contractAddress);
  console.log("NFT contract deployed at:", NFT.target);
  const currentFeeRecipient = await NFT.feeRecipient();
  console.log("Current fee recipient:", currentFeeRecipient);
}

main(config.contractAddress, config.contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });