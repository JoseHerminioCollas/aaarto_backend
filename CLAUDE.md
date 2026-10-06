# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Hardhat + TypeScript project for the Aaarto NFT contract (ERC-721, OpenZeppelin v5). Only `contracts/AaartoNFTV4.sol` is in use; it is deployed on Polygon mainnet. See `README.md` for the contract API, deployment addresses and administration notes.

## Frozen contract

`AaartoNFTV4` is deployed and **not upgradeable**. Do not edit `contracts/AaartoNFTV4.sol` or the compiler settings in `hardhat.config.ts` (`solidity: "0.8.28"`, no optimizer, no `settings` block). Any change alters the bytecode and breaks Polygonscan verification of the live contract. A contract change means a new deployment, so treat problems found in the contract as things to mitigate outside it unless a redeploy is planned.

Other files in `contracts/` (`AaartoNFT.sol`, `GLDToken.sol`, `Lock.sol`) and their tests and Ignition modules are older or template leftovers. `scripts/mintNFT.ts` and some other scripts are stale (they target `AaartoNFT` or unused env vars).

## Commands

```bash
npm install --legacy-peer-deps        # flag needed: Hardhat plugin peer-dep conflicts
npx hardhat compile
npx hardhat test                      # whole suite, in-process Hardhat network
npx hardhat test test/AaartoNFTV4.ts  # one file
npx hardhat test --grep "feeRecipient" # tests matching a name
npx hardhat run --network <network> scripts/<script>.ts
npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network <network>
```

There is no lint script. Prettier config exists only for `*.sol`. Node 20 or 22 is recommended (CI also runs 18).

### `.env` is required, even for tests

`hardhat.config.ts` passes `accounts: [process.env.PRIVATE_KEY || ""]` to every live network. Hardhat validates this on every command, so an unset or malformed `PRIVATE_KEY` fails with `HH8: Invalid account ... private key too short` before any test runs. CI sets a dummy key; locally, put a 32-byte hex key in `.env` (a throwaway key is fine for tests). `ALCHEMY_API_KEY` is only used to build the Sepolia RPC URL. `.env` is gitignored.

## Architecture

- `contracts/AaartoNFTV4.sol`: one contract combining `ERC721`, `Enumerable`, `URIStorage`, `Burnable`, `AccessControl` and `Ownable`. Permissions are split across two independent mechanisms: `Ownable` guards `setPlatformFee` and `setFeeRecipient`, while `DEFAULT_ADMIN_ROLE` guards `setMintEnabled`. `preSafeMint` is the only public mint path. It forwards all of `msg.value` to `feeRecipient`, grants the caller `MINTER_ROLE`, then calls the private `safeMint`.
- `ignition/modules/`: Hardhat Ignition deploy modules. The V4 module hardcodes the platform fee (`0.001`).
- `scripts/`: admin and inspection scripts run with `hardhat run`. Each imports one of `scripts/config_{local,sepolia,amoy,polygon}.json` for the contract address and picks it with a hardcoded `const config = ...` near the top of the file. The chosen config is not tied to `--network`, so check that they match before running a script that sends transactions.
- `test/AaartoNFTV4.ts`: the tests that matter. They deploy a fresh contract in `beforeEach` via `ethers.getContractFactory`. `Lock`, `GLDToken`, `AaartoNFT` and `Simple` tests cover the unused contracts.
- `typechain-types/`, `artifacts/`, `cache/` and `ignition/deployments/` are generated and gitignored.
