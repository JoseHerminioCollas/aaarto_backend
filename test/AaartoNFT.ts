import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aaarto Contract", () => {
  let contract: any;
  let owner: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  const tokenURI = "token-uri";

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("Aaarto");
    contract = await Contract.deploy();
    // returns the owner of the contract msg.sender
    [owner, minter] = await ethers.getSigners();
    await contract.waitForDeployment();
  });

  it("should have the expected owner", async () => {
    await expect(await contract.owner()).to.equal(owner.address);
  });

  it("should emit a Mint event with expected values", async () => {
    await expect(contract.preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 0, tokenURI);
  });

  it("should have expected minting prevention when disabled", async () => {
    await contract.connect(owner).setMintEnabled(false);
    await expect(contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.be.revertedWith("Caller is not a minter");
  });

  it("should allow a minter that has previously minted to mint when mintEnabled is false", async () => {
    await expect(await contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 0, tokenURI);
    await contract.connect(owner).setMintEnabled(false);
    await expect(await contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 1, tokenURI);
  });

  it("should always allow the owner to mint", async () => {
    await contract.connect(owner).setMintEnabled(false);
    await expect(await contract.connect(owner).preSafeMint(owner.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(owner.address, 0, tokenURI);
  });

  it("should prevent users without DEFAULT_ADMIN_ROLE from enabling minting", async () => {
    try {
      await contract.connect(minter).setMintEnabled(false);
    } catch (error) {
      expect(error.message).to.include("AccessControlUnauthorizedAccount");
    }
  });

});
