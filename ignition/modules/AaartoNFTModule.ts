import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AaartoNFTModule = buildModule("AaartoNFTModule", (m) => {
  const nft = m.contract("AaartoNFT");
  return { nft };
});

export default AaartoNFTModule;
