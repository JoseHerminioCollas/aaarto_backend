import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AaartoNFTModuleV2 = buildModule("AaartoNFTModuleV2", (m) => {
  const platformFee = "0.001"; // Platform fee in wei

  const nft = m.contract("AaartoNFTV2",
    [ethers.parseEther(platformFee)]
  );
  return { nft };
});

export default AaartoNFTModuleV2;
