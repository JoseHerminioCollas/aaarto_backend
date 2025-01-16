/** 
 * Use environment variables to provide arguments 
 * export contractAddress=""
 * export account=""
 * export tokenName=""
 * Run the script with hardhat run 
 * npx hardhat run scripts/getTokenBalance.ts --network NETWORK_NAME 
 */
import { ethers } from "hardhat";

async function getTokenBalance(contractAddress: string, account: string, tokenName: string) {
  const Token = await ethers.getContractFactory(tokenName);
  const token = Token.attach(contractAddress);

  const balance = await token.balanceOf(account);
  console.log(`Contact Address: ${contractAddress}`)
  console.log(`Balance of ${account}: ${ethers.formatUnits(balance, 18)} ${tokenName}`);
}

const contractAddress = process.env.contractAddress as string;
const account = process.env.account as string;
const tokenName = process.env.tokenName as string;

getTokenBalance(contractAddress, account, tokenName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
