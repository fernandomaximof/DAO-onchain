const { ethers } = require('hardhat');
const { BOX_CONTRACT_ADDRESS } = require('./helper_hardhat_config');

async function main() {
    const [ deployer ] = await ethers.getSigners();
    
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(BOX_CONTRACT_ADDRESS);
    console.log(await box.retrieve());
};

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });