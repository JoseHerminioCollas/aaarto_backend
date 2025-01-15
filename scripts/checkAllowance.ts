/** 
 * Use environment variables to provide arguments 
 * export contractAddress=""
 * export owner=""
 * export spender=""
 * Run the script with hardhat run 
 * npx hardhat run scripts/checkAllowance.ts --network sepolia 
 */
import { ethers } from "hardhat";

async function checkAllowance(contractAddress: string, owner: string, spender: string) {
  const GLDToken = await ethers.getContractFactory("GLDToken");
  const token = GLDToken.attach(contractAddress);

  const allowance = await token.allowance(owner, spender);
  console.log(`Allowance for ${spender} by ${owner}: ${ethers.utils.formatUnits(allowance, 18)} GLD`);
}

const contractAddress = process.env.contractAddress as string;
const owner = process.env.owner as string;
const spender = process.env.spender as string;

checkAllowance(contractAddress, owner, spender)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
