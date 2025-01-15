import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const initialSupply = 1000000; // Set your desired initial supply

const GLDTokenModule = buildModule("GLDTokenModule", (m) => {
  const token = m.contract("GLDToken", [initialSupply]);

  return { token };
});

export default GLDTokenModule;
