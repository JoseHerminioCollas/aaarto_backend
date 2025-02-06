import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatUnits(balance, "ether"), "ETH");

  const NFT = await ethers.getContractFactory("AaartoNFTV3");
  const gasPrice = ethers.parseUnits("10", "gwei");

  // Estimate gas for the deployment transaction
  const estimatedGas = await ethers.provider.estimateGas({
    from: deployer.address,
    data: NFT.bytecode,
    arguments: [ethers.parseEther("0.001")], // Pass the correct constructor argument
  });

  console.log("Estimated Gas:", estimatedGas.toString());

  // Deploy the contract with the estimated gas limit and gas price
  const nft = await NFT.deploy(ethers.parseEther("0.001"), {
    gasLimit: estimatedGas,
    gasPrice,
  });

  await nft.deployed();
  console.log("NFT contract deployed at address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
