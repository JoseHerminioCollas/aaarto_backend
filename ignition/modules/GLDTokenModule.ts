import { ethers } from "hardhat";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const initialSupply = 1000000; // Set your desired initial supply
const initialSupply = ethers.parseUnits("1000000", 18); // 1,000,000 tokens with 18 decimals

const GLDTokenModule = buildModule("GLDTokenModule", (m) => {
  const token = m.contract("GLDToken", [initialSupply]);

  return { token };
});

export default GLDTokenModule;
