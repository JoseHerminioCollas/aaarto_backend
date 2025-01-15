/**
Use environment variables to provide arguments
export contractAddress=""
export contractName=""
Run the script with hardhat run
npx hardhat run scripts/list.ts --network sepolia
 */
import { ethers } from 'hardhat';

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

listFunctions(process.env.contractAddress as string, process.env.contractName as string)
    .then(() => process.exit(0)).catch((error) => {
        console.error(error);
        process.exit(1);
    });
