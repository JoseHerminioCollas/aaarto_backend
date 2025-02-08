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
