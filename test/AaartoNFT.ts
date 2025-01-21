import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aaarto Contract", function () {
  let contract: any;
  let owner: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  let minter2: HardhatEthersSigner;
  const tokenURI = "token-uri";

  beforeEach(async function () {
    const Contract = await ethers.getContractFactory("Aaarto");
    contract = await Contract.deploy();
    // returns the owner of the contract msg.sender
    [owner, minter, minter2] = await ethers.getSigners();
    await contract.waitForDeployment();
  });

  it("should have the expected owner", async () => {
    await expect(await contract.owner()).to.equal(owner.address)
  })

  it("should emit a Mint event with expected values", async () => {
    await expect(contract.preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 0, tokenURI)
  })

  it("should prevent minting when disabled", async function () {
    await contract.connect(owner).setMintEnabled(false);
    await expect(contract.connect(minter2).preSafeMint(minter2.address, tokenURI))
      .to.be.revertedWith("Caller is not a minter");
  });
  it("should allow a minter that has previously minted to mint when mintEnabled is false", async () => {
    await expect(await contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 0, tokenURI);
    await contract.connect(owner).setMintEnabled(false);
    await expect(await contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.emit(contract, "Mint").withArgs(minter.address, 1, tokenURI)
  })
});
