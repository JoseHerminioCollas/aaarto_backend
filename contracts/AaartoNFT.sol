// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact aaarto-security@goatstone.com
contract AaartoNFT is
  ERC721,
  ERC721Enumerable,
  ERC721URIStorage,
  ERC721Burnable,
  AccessControl,
  Ownable
{
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  uint256 private _nextTokenId;
  bool private mintEnabled;
  event Mint(address indexed to, uint256 indexed tokenID, string tokenURI);
  uint256 public platformFee; // Platform fee in wei
  address payable public feeRecipient; // Address to receive the platform fee

  constructor(uint256 _platformFee) ERC721("Aaarto", "AAARTO") Ownable(msg.sender) {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    platformFee = _platformFee; // Set the platform fee during contract deployment
    mintEnabled = true;
  }

  function preSafeMint(address to, string memory uri) external payable {
    require(mintEnabled || owner() == msg.sender, "Minting not enabled currently");

    // Check if the sent value matches or exceeds the platform fee
    require(msg.value >= platformFee, "Insufficient platform fee");

    // Transfer the platform fee to the fee recipient
    feeRecipient.transfer(msg.value);

    // Refund any excess amount sent
    if (msg.value > platformFee) {
      payable(msg.sender).transfer(msg.value - platformFee);
    }

    // Grant the sender the MINTER_ROLE
    _grantRole(MINTER_ROLE, msg.sender);
    safeMint(to, uri);
  }

  function safeMint(address to, string memory uri) private onlyRole(MINTER_ROLE) {
    uint256 tokenId = _nextTokenId++;
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
    emit Mint(to, tokenId, uri);
  }

  function setMintEnabled(bool enabled) external onlyRole(DEFAULT_ADMIN_ROLE) {
    mintEnabled = enabled;
  }

  function setPlatformFee(uint256 _platformFee) external onlyOwner {
    platformFee = _platformFee;
  }

  function setFeeRecipient(address payable _feeRecipient) external onlyOwner {
    feeRecipient = _feeRecipient;
  }

  // The following functions are overrides required by Solidity.

  function _update(
    address to,
    uint256 tokenId,
    address auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(
    address account,
    uint128 value
  ) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
