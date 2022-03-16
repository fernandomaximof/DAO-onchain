const { ethers } = require('hardhat');
const { RINKEBY_BOX_CONTRACT_ADDRESS } = require('./helper_hardhat_config');

async function main() {
  const networkName = hre.network.name

  if (networkName == 'rinkeby') {
      const [ deployer ] = await ethers.getSigners();
      
      const Box = await ethers.getContractFactory('Box');
      const box = await Box.attach(RINKEBY_BOX_CONTRACT_ADDRESS);
      var value = BigInt(await box.retrieve());
      console.log(value);
  }
};

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });