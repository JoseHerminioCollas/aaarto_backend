import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
require('dotenv').config()

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
// An empty key makes Hardhat reject the whole config (HH8), so only set accounts when a key exists
const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts,
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts,
    },
    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts,
    },
  },
};

export default config;
