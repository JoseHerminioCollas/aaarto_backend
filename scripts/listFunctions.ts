/**
Run the script with hardhat run
npx hardhat run scripts/list.ts --network NETWORK_NAME
 */
import { ethers } from 'hardhat';
import config from "./config.json";

async function listFunctions(contractAddress: string, contractName: string) {
    console.log('Contract address:', contractAddress);
    console.log('Contract name:', contractName);

    const contract = await ethers.getContractFactory(contractName);
    console.log('Contract factory created.');

    contract.attach(contractAddress);
    console.log('Contract attached.');

    // List the functions available in the contract
    const abi = contract.interface.fragments;
    const functionNames = abi
        .filter(fragment => fragment.type === 'function')
        .map(fragment => fragment.name);
    console.log('Available functions:', functionNames);

}

listFunctions(config.contractAddress, config.contractName)
    .then(() => process.exit(0)).catch((error) => {
        console.error(error);
        process.exit(1);
    });
