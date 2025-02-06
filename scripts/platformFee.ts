const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x476e4346B8D24D380708bd5Ad689f0847b5feb33"; // Replace with your contract address
  const NFT = await ethers.getContractAt("AaartoNFTV2", contractAddress);

  console.log("NFT contract deployed at:", NFT.address);

  // Interact with the contract
  const platformFee = await NFT.platformFee();
  console.log("Platform Fee:", platformFee.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
