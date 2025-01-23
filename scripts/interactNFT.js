/**
run with node interact.js
SAMPLE CODE
 */

const { ethers } = require("ethers");
const AaartoNFTAbi = require("./path/to/your/AaartoNFTAbi.json");

const provider = new ethers.providers.JsonRpcProvider("YOUR_SEPOLIA_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const AaartoNFTContract = new ethers.Contract(contractAddress, AaartoNFTAbi, signer);

async function mintNFT() {
  const tokenURI = "ipfs://your-token-uri";
  const tx = await AaartoNFTContract.mint(signer.address, tokenURI);
  console.log("Minting transaction:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

mintNFT().catch(console.error);
