import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aaarto Contract", function () {
  let contract: any;
  let admin: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  let user: HardhatEthersSigner;
  let anotherUser: HardhatEthersSigner;

  beforeEach(async function () {
    [admin, minter, user, anotherUser] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Aaarto");
    contract = await Contract.deploy(admin.address, minter.address);
  });

  it.skip("should allow minting when enabled", async function () { 
    await contract.setMintEnabled(true); 
    await contract.preSafeMint(user.address, "https://example.com/token-uri"); 
    expect(await contract.ownerOf(contract)).to.equal(user.address); });

  it("should prevent minting when disabled", async function () {
    await contract.setMintEnabled(false);
    await expect(contract.preSafeMint(user.address, "https://example.com/token-uri")).to.be.revertedWith("Caller is not a minter");
  });
});
