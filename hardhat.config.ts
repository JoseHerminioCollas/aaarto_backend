import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
import LockModule from "./ignition/modules/LockModule";
import GLDTokenModule from "./ignition/modules/GLDTokenModule";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";

const config: HardhatUserConfig & { ignition: { modules: unknown[] } } = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  ignition: {
    modules: [LockModule, GLDTokenModule],
  }
};

export default config;
