import { ethers } from 'hardhat';

async function main() {
    const contractAddress = '0xb3D426E52b3E97d12877985C2930049d2971c1b7';
    console.log('Contract address:', contractAddress);

    const Lock = await ethers.getContractFactory('Lock');
    console.log('Contract factory created.');

    const lock = Lock.attach(contractAddress);
    console.log('Contract attached.');

    // List the functions available in the contract
    const abi = Lock.interface.fragments;
    const functionNames = abi
        .filter(fragment => fragment.type === 'function')
        .map(fragment => fragment.name);

    console.log('Available functions:');
    console.log(functionNames);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});

/**
 * 
 npx hardhat run scripts/list.ts --network sepolia
Contract address: 0xb3D426E52b3E97d12877985C2930049d2971c1b7
Contract factory created.
Contract attached.
Available functions:
[ 'owner', 'unlockTime', 'withdraw' ]
 */