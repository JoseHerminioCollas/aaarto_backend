import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

const platformFee = "0.001"; // Platform fee in wei
const parsedPlatformFee = ethers.parseEther(platformFee)

describe("Aaarto Contract", () => {
  let contract: any;
  let owner: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  const tokenURI = "token-uri";

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("AaartoNFTV4");

    contract = await Contract.deploy(parsedPlatformFee);
    // returns the owner of the contract msg.sender
    [owner, minter] = await ethers.getSigners();
    await contract.waitForDeployment();
  });

  it("should have the expected platformFee", async () => {
    const pf = await contract.platformFee()
    expect(pf).to.equal(parsedPlatformFee);
  })

  it("should have the expected feeRecipient", async () => {
    expect(await contract.feeRecipient()).to.equal(owner.address);
  })

  it("should have the expected owner", async () => {
    await expect(await contract.owner()).to.equal(owner.address);
  });

  it("should emit a Mint event with expected values", async () => {
    const platformFee = "0.001"; // Platform fee in wei
    const parsedPlatformFee = ethers.parseEther(platformFee);

    await expect(contract.preSafeMint(minter.address, tokenURI,
      {
        value: parsedPlatformFee
      }
    ))
      .to.emit(contract, "Mint").withArgs(minter.address, 0, tokenURI);
  });

  it("should prevent users without MINTER_ROLE from minting when mintEnabled is false", async () => {
    await contract.connect(owner).setMintEnabled(false);
    await expect(contract.connect(minter).preSafeMint(minter.address, tokenURI))
      .to.be.revertedWith("Minting not enabled currently");
  });

  it("should always allow the owner to mint", async () => {
    const platformFee = "0.001"; // Platform fee in wei
    const parsedPlatformFee = ethers.parseEther(platformFee);

    await contract.connect(owner).setMintEnabled(false);
    await expect(await contract.connect(owner).preSafeMint(owner.address, tokenURI,
      {
        value: parsedPlatformFee
      }
    ))
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
    const platformFee = "0.001"; // Platform fee in wei
    const parsedPlatformFee = ethers.parseEther(platformFee);

    await contract.connect(minter).preSafeMint(minter.address, tokenURI,
      {
        value: parsedPlatformFee
      }
    );
    const hasMinterRole = await contract.hasRole(contract.MINTER_ROLE(), minter.address);
    expect(hasMinterRole).to.be.true;
  });

  /**
    The following tests are
    for functions that are overrides required by Solidity.
  */

  it("should return the correct token URI", async () => {
    const platformFee = "0.001"; // Platform fee in wei
    const parsedPlatformFee = ethers.parseEther(platformFee);

    await contract.connect(owner).preSafeMint(owner.address, tokenURI,
      {
        value: parsedPlatformFee
      }
    );
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
