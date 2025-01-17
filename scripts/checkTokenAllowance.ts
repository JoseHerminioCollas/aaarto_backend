/** 
 * Use environment variables to provide arguments 
 * export contractAddress=""
 * export owner=""
 * export spender=""
 * export tokenName=""
 * Run the script with hardhat run 
 * npx hardhat run scripts/checkTokenAllowance.ts --network NETWORK_NAME 
 */
import { ethers } from "hardhat";

async function checkTokenAllowance(contractAddress: string, owner: string, spender: string, tokenName: string) {
  const Token = await ethers.getContractFactory(tokenName);
  const token = Token.attach(contractAddress);

  const allowance = await token.allowance(owner, spender);
  console.log(`Contact Address: ${contractAddress}`);
  console.log(`Allowance for ${spender} by ${owner}: ${ethers.formatUnits(allowance, 18)} : ${tokenName}`);
}

const contractAddress = process.env.contractAddress as string;
const owner = process.env.owner as string;
const spender = process.env.spender as string;
const tokenName = process.env.tokenName as string;

checkTokenAllowance(contractAddress, owner, spender, tokenName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
