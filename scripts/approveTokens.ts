/** 
 * Use environment variables to provide arguments 
 * export contractAddress=""
 * export spender=""
 * export amount=""
 * export tokenName=""
 * Run the script with hardhat run 
 * npx hardhat run scripts/approveTokens.ts --network NETWORK_NAME 
 */
import { ethers } from "hardhat";

async function approveTokens(contractAddress: string, spender: string, amount: string, tokenName: string) {
  const Token = await ethers.getContractFactory(tokenName);
  const token = Token.attach(contractAddress);

  const tx = await token.approve(spender, ethers.parseUnits(amount, 18));
  console.log(`Token Name: ${tokenName} Token Address: ${contractAddress}`)
  console.log(`Approved ${amount} for ${spender}. Transaction hash: ${tx.hash}`);
}

const contractAddress = process.env.contractAddress as string;
const spender = process.env.spender as string;
const amount = process.env.amount as string;
const tokenName = process.env.tokenName as string;

approveTokens(contractAddress, spender, amount, tokenName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
