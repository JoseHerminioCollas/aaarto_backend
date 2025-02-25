// getFeeRecipient.ts
import { ethers } from 'hardhat';
import config_local from "./config_local.json";
import config_polgon from "./config_polygon.json";

const config = config_polgon;

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