/** 
 * Use environment variables to provide arguments 
 * export contractAddress=""
 * export to=""
 * export amount=""
 * export tokenName=""
 * Run the script with hardhat run 
 * npx hardhat run scripts/transferTokens.ts --network NETWORK_NAME 
 */
import { ethers } from "hardhat";

async function transferTokens(contractAddress: string, to: string, amount: string, tokenName: string) {
  const Token = await ethers.getContractFactory(tokenName);
  const token = Token.attach(contractAddress);

  const tx = await token.transfer(to, ethers.parseUnits(amount, 18));
  console.log(`Token Name: ${tokenName} Token Address: ${contractAddress}`)
  console.log(`Transferred ${amount} to ${to}. Transaction hash: ${tx.hash}`);
}

const contractAddress = process.env.contractAddress as string;
const to = process.env.to as string;
const amount = process.env.amount as string;
const tokenName = process.env.tokenName as string;

transferTokens(contractAddress, to, amount, tokenName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
