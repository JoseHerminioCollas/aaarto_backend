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
