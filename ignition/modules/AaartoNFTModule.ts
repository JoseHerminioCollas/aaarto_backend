import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AaartoNFTModuleV2 = buildModule("AaartoNFTModuleV2", (m) => {
  const platformFee = "0.001"; // Platform fee in wei

  const nft = m.contract("AaartoNFT", {
    args: [ethers.parseEther(platformFee)],
    options: { gasLimit: 3000000 } // Adjust gas limit
  });

  return { nft };
});

export default AaartoNFTModuleV2;

// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { ethers } from "ethers";

// const AaartoNFTModuleV2 = buildModule("AaartoNFTModuleV2", (m) => {
//   const platformFee = "0.001"; // Platform fee in wei

//   const nft = m.contract("AaartoNFT",
//     [ethers.parseEther(platformFee)]
//   );
//   return { nft };
// });

// export default AaartoNFTModuleV2;
// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { ethers } from "ethers";

// const AaartoNFTModule = buildModule("AaartoNFTModule", (m) => {
//   const platformFee = "0.001"; // Platform fee in wei

//   const nft = m.contract("AaartoNFT",
//     [ethers.parseEther(platformFee)]
//   );
//   return { nft };
// });

// export default AaartoNFTModule;
