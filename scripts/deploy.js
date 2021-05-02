// import BlockStarterContract from "../contract_ABI/BlockStarter.sol/BlockStarter.json";

// import { ethers } from "ethers";

async function main() {

    const [deployer] = await ethers.getSigners("localhost:8545");

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const CZF = await ethers.getContractFactory("BlockStarter");
    // const BlockStarter = require("../build/contracts/BlockStarter.sol/BlockStarter.json");
    // const CZF = await new ethers.ContractFactory(BlockStarter.abi, BlockStarter.bytecode, deployer);
    // const CZF = new ethers.ContractFactory.fromSolidity(BlockStarter);
    const CZ = await CZF.deploy();

    console.log("BlockStarter contract address:", CZ.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

/*

npx hardhat run --network rinkeby scripts/deploy.js
Deploying contracts with the account: 0x4327D8b79AB0499F81dD801db4365CdC914d6f3f
Account balance: 440862942468775582807
CryptoZombies contract address: 0xB11f26ad0bb7f4705F9eB116c224FFc323798695


Contract deployment: CampaignFactory
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x8c91ec716107ed07fa745ecb04d85f58bceef4725619968f76c785d51fd3b196
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            844107 of 844107
  Block #1:            0x8237271e4d3421f9f34d6eddf6a87fe42662b6233e2ac99e692904c44abca797

*/