import { ethers } from "hardhat";
import config from "./config.json";

const main = async (contractAddress: string, contractName: string) => {
  const NFT = await ethers.getContractAt("AaartoNFTV4", contractAddress);
  console.log("NFT contract deployed at:", NFT.target);

  console.log("setting fee recipient : account1:", config.account1 );
  await NFT.setFeeRecipient(config.account1);
  const currentFeeRecipient = await NFT.feeRecipient();
  console.log("Current fee recipient:", currentFeeRecipient);
}

main(config.contractAddress, config.contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
