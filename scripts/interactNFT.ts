/**
run with node interact.js
SAMPLE CODE
 */

import { ethers } from "ethers" ;
import AaartoNFTAbi from "../artifacts/contracts/AaartoNFT.sol/AaartoNFT.json" ;

const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";

const provider = new ethers.providers.JsonRpcProvider("YOUR_SEPOLIA_RPC_URL");
const signer = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const AaartoNFTContract = new ethers.Contract(contractAddress, AaartoNFTAbi, signer);

const mintNFT = async () => {
  const tokenURI = "ipfs://your-token-uri";
  const tx = await AaartoNFTContract.mint(signer.address, tokenURI);
  console.log("Minting transaction:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

mintNFT().catch(console.error);
