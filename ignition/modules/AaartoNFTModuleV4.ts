import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AaartoNFTModuleV4 = buildModule("AaartoNFTModuleV4", (m) => {
  const platformFee = "0.001"; // Platform fee in wei

  const nft = m.contract("AaartoNFTV4",
    [ethers.parseEther(platformFee)]
  );
  return { nft };
});

export default AaartoNFTModuleV4;

// npx hardhat node
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network localhost
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV3.ts --network sepolia
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network polygon
// npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network polygon_amoy
// npx hardhat run --network localhost scripts/setPlatformFee.ts

// polygon contract owner 0x36708B00D26Da1a6068577cD009732b79926AaCd
// contract address 0x03a9423E9Aac42E9F991D292F8e074808D9ABE7f
