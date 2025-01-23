/**
run with node interact.js
SAMPLE CODE
IPFS image:
bafkreiegvc5ny4k2gukg5kolwydvjt7pbfvcd6yarg66six7mjwwd4rsvu
https://black-adverse-mite-295.mypinata.cloud/ipfs/bafkreiegvc5ny4k2gukg5kolwydvjt7pbfvcd6yarg66six7mjwwd4rsvu
 */
// import { ethers } from "ethers";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
// import AaartoNFTAbi from "../artifacts/contracts/AaartoNFT.sol/AaartoNFT.json";
import contractArtifact from '../artifacts/contracts/AaartoNFT.sol/AaartoNFT.json'; 
const AaartoNFTAbi = contractArtifact.abi;

// console.log("ABI Content:", JSON.stringify(AaartoNFTAbi, null, 2));

const WALLET_PRIVATE_KEY = (process.env.WALLET_PRIVATE_KEY || "").trim();
const ALCHEMY_SEPOLIA_API_URL = process.env.ALCHEMY_SEPOLIA_API_URL || "";

const provider = new JsonRpcProvider(ALCHEMY_SEPOLIA_API_URL);
const signer = new Wallet(WALLET_PRIVATE_KEY, provider);
const contractAddress = "0x85DC05D8fCd6602d7e410A5687ff634D38726215";
const AaartoNFTContract = new Contract(contractAddress, AaartoNFTAbi, signer);
const ipfsTokenURI = "ipfs://bafkreigdp2mbtobilxspcw34gl57e6zkd744k644wexo4rchs7zpfqrm7q";

const mintNFT = async () => {
  const tx = await AaartoNFTContract.preSafeMint(signer.address, ipfsTokenURI);
  console.log("Minting transaction:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

mintNFT().catch(console.error);
