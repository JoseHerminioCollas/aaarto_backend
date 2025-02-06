import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AaartoNFTModuleV3 = buildModule("AaartoNFTModuleV3", (m) => {
  const platformFee = "0.001"; // Platform fee in wei

  const nft = m.contract("AaartoNFTV3",
    [ethers.parseEther(platformFee)]
  );
  return { nft };
});

export default AaartoNFTModuleV3;
