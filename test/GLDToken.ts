import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("GLDToken", function () {
  let token: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    addr1 = signers[1];
    addr2 = signers[2];

    const Token = await ethers.getContractFactory("GLDToken");
    token = await Token.deploy(ethers.parseUnits("1000000", 18));
    // await token.deployed();
    // Ensure the deployment is complete 
    await token.deploymentTransaction().wait(); // Alternative way to ensure contract is deployed

  });

  it("Should have the correct initial supply", async function () {
    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(ethers.parseUnits("1000000", 18));
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(await addr1.getAddress(), ethers.parseUnits("1000", 18));
    const addr1Balance = await token.balanceOf(await addr1.getAddress());
    expect(addr1Balance).to.equal(ethers.parseUnits("1000", 18));
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await token.balanceOf(await owner.getAddress());

    try {
      await token.connect(addr1).transfer(await owner.getAddress(), ethers.parseUnits("1000", 18));
      expect.fail("Expected transaction to be reverted");
    } catch (error: any) {
      expect(error.message).to.include("ERC20InsufficientBalance");
    }

    const ownerBalance = await token.balanceOf(await owner.getAddress());
    expect(ownerBalance).to.equal(initialOwnerBalance);
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance: bigint = BigInt(await token.balanceOf(await owner.getAddress()));

    await token.transfer(await addr1.getAddress(), ethers.parseUnits("1000", 18));
    await token.transfer(await addr2.getAddress(), ethers.parseUnits("500", 18));

    const finalOwnerBalance = await token.balanceOf(await owner.getAddress());
    expect(finalOwnerBalance).to.equal(initialOwnerBalance - (ethers.parseUnits("1500", 18)));

    const addr1Balance = await token.balanceOf(await addr1.getAddress());
    expect(addr1Balance).to.equal(ethers.parseUnits("1000", 18));

    const addr2Balance = await token.balanceOf(await addr2.getAddress());
    expect(addr2Balance).to.equal(ethers.parseUnits("500", 18));
  });
});
