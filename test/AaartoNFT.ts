import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aaarto Contract", () => {
  let contract: any;
  let owner: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  const tokenURI = "token-uri";

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("AaartoNFT");
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

  it("should prevent users without MINTER_ROLE from minting when mintEnabled is false", async () => {
    await contract.connect(owner).setMintEnabled(false);
    await expect(contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.be.revertedWith("Caller is not a minter");
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

  it("should grant MINTER_ROLE to the minter when mintEnabled is true", async () => {
    await contract.connect(minter).preSafeMint(minter.address, tokenURI);
    const hasMinterRole = await contract.hasRole(contract.MINTER_ROLE(), minter.address);
    expect(hasMinterRole).to.be.true;
  });

  /**
    The following tests are
    for functions that are overrides required by Solidity.
  */

  it("should return the correct token URI", async () => {
    await contract.connect(owner).preSafeMint(owner.address, tokenURI);
    const tokenId = 0;
    expect(await contract.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("should support the required interfaces", async () => {
    const interfaceIds = [
      "0x80ac58cd", // ERC721
      "0x5b5e139f", // ERC721Metadata
      "0x780e9d63", // ERC721Enumerable
      "0x01ffc9a7"  // ERC165
    ];

    for (const interfaceId of interfaceIds) {
      expect(await contract.supportsInterface(interfaceId)).to.be.true;
    }
  });

});
