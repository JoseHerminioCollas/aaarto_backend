import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aaarto Contract", function () {
  let contract: any;
  let admin: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  let minter2: HardhatEthersSigner;
  const tokenURI = "https://example.com/token-uri";

  beforeEach(async function () {
    [admin, minter, minter2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Aaarto");
    contract = await Contract.deploy();
  });

  it("should allow minting initially", async function () {
    const tx = await contract.preSafeMint(minter.address, tokenURI);
    const receipt = await tx.wait();
    const mintEvent = contract.interface.getEvent('Mint');
    // const y=contract.interface.decodeEventLog(z)
    // await contract.ownerOf(contract)
    console.log("receipt: ", receipt);
    console.log('mintEvent: ', mintEvent);
    console.log('minter.address: ', minter.address);
    expect(receipt).to.equal(123);
  });

  it.skip("should prevent minting when disabled", async function () {
    await contract.setMintEnabled(false);
    await expect(contract.preSafeMint(minter2.address, tokenURI))
      .to.be.revertedWith("Caller is not a minter");
  });
});
