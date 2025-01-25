import { JsonRpcProvider, Wallet, Contract } from "ethers";
import contractArtifact from '../artifacts/contracts/AaartoNFT.sol/AaartoNFT.json';

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
const ALCHEMY_SEPOLIA_API_URL = process.env.ALCHEMY_SEPOLIA_API_URL || "";

const AaartoNFTAbi = contractArtifact.abi;
const provider = new JsonRpcProvider(ALCHEMY_SEPOLIA_API_URL);
const signer = new Wallet(WALLET_PRIVATE_KEY, provider);
const contractAddress = "0x85DC05D8fCd6602d7e410A5687ff634D38726215";
const AaartoNFTContract = new Contract(contractAddress, AaartoNFTAbi, signer);
const ipfsTokenURI = "ipfs://bafkreiesuxfdkg7fz2zacjum5y37cjopavm5s3uwmtrwgsjjnufz46t7om";

const mintNFT = async () => {
  const tx = await AaartoNFTContract.preSafeMint(signer.address, ipfsTokenURI);
  console.log("Minting transaction:", tx.hash);
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

mintNFT().catch(console.error);
