const { ethers } = require('hardhat');
const { NEW_STORE_VALUE
  , PROPOSAL_DESCRIPTION
  , RINKEBY_BOX_CONTRACT_ADDRESS
  , RINKEBY_GOVERNOR_CONTRACT_ADDRESS } = require('./helper_hardhat_config');

async function main() {
  const networkName = hre.network.name

  if (networkName == 'rinkeby') {
    try {
      const Box = await ethers.getContractFactory('Box');
      const box = await Box.attach(RINKEBY_BOX_CONTRACT_ADDRESS);

      const GovernorContract = await ethers.getContractFactory('GovernorContract');
      const governorContract = await GovernorContract.attach(RINKEBY_GOVERNOR_CONTRACT_ADDRESS);

      console.log([box.address])
      // const proposeTx = await governorContract.propose([box.address], [0], [NEW_STORE_VALUE], PROPOSAL_DESCRIPTION);
      // await proposeTx.wait(1);
    } catch(e) {
      console.log(e);
    }
  }

};

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });