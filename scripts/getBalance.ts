/** 
 * Use environment variables to provide arguments 
 * export contractAddress="0xE9Aed56dAa723b2C5c5c00DB9201116fF0642777"
 * export account="0x4055e5DfA831F70c8D7900eFa44D247997667837"
 * Run the script with hardhat run 
 * npx hardhat run scripts/getBalance.ts --network sepolia 
 */
import { ethers } from "hardhat";

async function getBalance(contractAddress: string, account: string) {
  const GLDToken = await ethers.getContractFactory("GLDToken");
  const token = GLDToken.attach(contractAddress);

  const balance = await token.balanceOf(account);
  console.log(`Balance of ${account}: ${ethers.formatUnits(balance, 18)} GLD`);
}

const contractAddress = process.env.contractAddress as string;
const account = process.env.account as string;

getBalance(contractAddress, account)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
