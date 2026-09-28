# aaarto_backend

Smart contract for **Aaarto**, an NFT collection of custom images. Built with [Hardhat](https://hardhat.org/) and [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) v5.

The contract in use is [`AaartoNFTV4`](contracts/AaartoNFTV4.sol), an ERC-721 with enumeration, per-token URIs and burning. Minting is paid: the caller sends a platform fee that is forwarded to a fee recipient.

## Deployments

| Network | Address |
|---|---|
| Polygon mainnet | [`0x03a9423E9Aac42E9F991D292F8e074808D9ABE7f`](https://polygonscan.com/address/0x03a9423E9Aac42E9F991D292F8e074808D9ABE7f) |
| Sepolia (testing) | see [`scripts/config_sepolia.json`](scripts/config_sepolia.json) |

The deployed contract is **not upgradeable**. Do not change [`AaartoNFTV4.sol`](contracts/AaartoNFTV4.sol) or the compiler settings in [`hardhat.config.ts`](hardhat.config.ts) (`solidity: "0.8.28"`, no optimizer): a change alters the bytecode and breaks verification of the deployed contract. Changes to the contract mean a new deployment.

## Requirements

- Node.js 20 or 22
- npm

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is currently needed because of conflicting Hardhat plugin peer dependencies.

## Configuration

Create a `.env` file in the project root (it is gitignored):

```
PRIVATE_KEY=<64 hex characters, optional 0x prefix>
ALCHEMY_API_KEY=<key for the Sepolia RPC>
```

- `PRIVATE_KEY` signs transactions when deploying or calling admin functions on a live network. Use a dedicated key, never a key that holds funds you care about.
- `ALCHEMY_API_KEY` is used for the Sepolia RPC URL.
- Networks are defined in [`hardhat.config.ts`](hardhat.config.ts): `localhost`, `sepolia`, `polygon`, `polygon_amoy`.

Never commit `.env` or paste a private key into an issue or pull request.

## Common commands

```bash
npx hardhat compile      # compile the contracts
npx hardhat test         # run the test suite
npx hardhat clean        # remove build artifacts
```

## Deploying

Deployments use [Hardhat Ignition](https://hardhat.org/ignition). The V4 module deploys with a platform fee of `0.001` (in the chain's native token):

```bash
# local
npx hardhat node
npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network localhost

# testnet / mainnet
npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network sepolia
npx hardhat ignition deploy ignition/modules/AaartoNFTModuleV4.ts --network polygon
```

After deploying, record the address in the matching `scripts/config_<network>.json` file. Test on Sepolia before Polygon.

## Contract overview

| Function | Access | Description |
|---|---|---|
| `preSafeMint(to, uri)` | anyone (payable) | Mints a token to `to` with metadata `uri`. Requires `msg.value >= platformFee`. Allowed while minting is enabled, or always for the owner. |
| `platformFee()` | view | Current fee, in wei of the native token (ETH on Sepolia, POL on Polygon). |
| `feeRecipient()` | view | Address that receives the fee. |
| `setPlatformFee(fee)` | owner | Change the fee. |
| `setFeeRecipient(address)` | owner | Change the fee recipient. |
| `setMintEnabled(bool)` | admin role | Turn public minting on or off. |

### Notes for integrators

- **Send exactly `platformFee()`.** The whole `msg.value` is forwarded to the fee recipient, so anything above the fee is not refunded. Read `platformFee()` right before sending, and re-quote if the transaction reverts with `Insufficient platform fee` (the fee may have changed).
- **The fee recipient must be a plain wallet.** The fee is sent with `transfer`, which forwards little gas. A contract recipient (for example a multisig) would make every mint revert.
- **Metadata is not validated on-chain.** Anyone can mint any `tokenURI`. Check URIs before displaying tokens. See [`IPFS/nft-metadata_2.json`](IPFS/nft-metadata_2.json) for the expected metadata shape.
- `mintEnabled` has no public getter.
- The setters emit no events. Ownership and role changes emit the standard `OwnershipTransferred`, `RoleGranted` and `RoleRevoked` events.

## Administration

Control of the contract is split between two independent mechanisms:

- **Owner** (`Ownable`): `setPlatformFee`, `setFeeRecipient`, and minting while it is disabled.
- **Admin** (`DEFAULT_ADMIN_ROLE`): `setMintEnabled`, and granting or revoking admin.

When handing over control, move **both**: `transferOwnership(newOwner)` and `grantRole(DEFAULT_ADMIN_ROLE, newOwner)`, then verify the new account works before the old one calls `renounceRole`. Never call `renounceOwnership`, and never renounce the last admin. Either one permanently disables the functions it guards. `transferOwnership` takes effect immediately, so double-check the address.

## Scripts

Helper scripts live in [`scripts/`](scripts/) and run with:

```bash
npx hardhat run --network <network> scripts/<script>.ts
```

| Script | Purpose |
|---|---|
| `getPlatformFee.ts`, `setPlatformFee.ts` | Read or change the platform fee |
| `getFeeRecipient.ts`, `setFeeRecipient.ts` | Read or change the fee recipient |
| `getMintEnabled.ts`, `listFunctions.ts` | Inspect the contract |

Each script reads its contract address from one of the `scripts/config_*.json` files, chosen by the `config` line at the top of the script. **Make sure the config matches the `--network` you pass**, or the call goes to the wrong address. Some scripts are out of date and are tracked for cleanup.

## Project layout

```
contracts/    Solidity sources
ignition/     Hardhat Ignition deployment modules
scripts/      Admin and inspection scripts, per-network config JSON
test/         Hardhat tests (Mocha, Chai)
IPFS/         Example NFT metadata and image
```

## Testing

```bash
npx hardhat test
```

Tests run on the in-process Hardhat network. CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs the same command on Node 18, 20 and 22.

## Security

Report vulnerabilities privately to **aaarto-security@goatstone.com** rather than opening a public issue.

## License

MIT. See [LICENSE](LICENSE).
