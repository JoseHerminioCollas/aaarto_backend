import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AaartoNFTModule = buildModule("AaartoNFTModule", (m) => {
  const platformFee = "0.001"; // Platform fee in wei

  const nft = m.contract("AaartoNFT",
    [ethers.parseEther(platformFee)]
  );
  return { nft };
});

export default AaartoNFTModule;
