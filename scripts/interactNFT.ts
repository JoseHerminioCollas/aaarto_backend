/**
run with node interact.js
SAMPLE CODE
IPFS image:
bafkreiegvc5ny4k2gukg5kolwydvjt7pbfvcd6yarg66six7mjwwd4rsvu
https://black-adverse-mite-295.mypinata.cloud/ipfs/bafkreiegvc5ny4k2gukg5kolwydvjt7pbfvcd6yarg66six7mjwwd4rsvu
 */
import { ethers } from "ethers";
import AaartoNFTAbi from "../artifacts/contracts/AaartoNFT.sol/AaartoNFT.json";

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
const ALCHEMY_SEPOLIA_API_URL = process.env.ALCHEMY_SEPOLIA_API_URL || "";

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_SEPOLIA_API_URL);
const signer = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
const contractAddress = "0x85DC05D8fCd6602d7e410A5687ff634D38726215";
const AaartoNFTContract = new ethers.Contract(contractAddress, AaartoNFTAbi, signer);
const ipfsTokenURI = ""

const mintNFT = async () => {
  const tx = await AaartoNFTContract.mint(signer.address, ipfsTokenURI);
  console.log("Minting transaction:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

mintNFT().catch(console.error);
