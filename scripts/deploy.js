const { ethers } = require('hardhat');
const { MIN_DELAY, VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE, ADDRESS_ZERO } = require('./helper_hardhat_config');

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const GovernorContract = await ethers.getContractFactory("GovernorContract");
    const Box = await ethers.getContractFactory("Box");
    
    const governanceToken = await GovernanceToken.deploy();
    const timeLock = await TimeLock.deploy(MIN_DELAY, [], []);
    const governorContract = await GovernorContract.deploy(governanceToken.address, 
        timeLock.address, 
        QUORUM_PERCENTAGE, 
        VOTING_PERIOD, 
        VOTING_DELAY);
    const box = await Box.deploy();

    console.log("GovernanceToken to:", governanceToken.address);
    console.log("TimeLock to:", timeLock.address);
    console.log("GovernorContract to:", governorContract.address);
    console.log("Box to:", box.address);

    const proposerRole = timeLock.PROPOSER_ROLE();
    const executorRole = timeLock.EXECUTOR_ROLE();
    const adminRole = timeLock.TIMELOCK_ADMIN_ROLE();
    const proposerTx = await timeLock.grantRole(proposerRole, governorContract.address);
    await proposerTx.wait(1);
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
    await executorTx.wait(1);
    const revokeTx = await timeLock.revokeRole(adminRole, deployer.address);
    await revokeTx.wait(1);

    const transferBoxOnwerTx = await box.transferOwnership(timeLock.address);
    await transferBoxOnwerTx.wait(1);

    await governanceToken.delegate(deployer.address);
    const balance = BigInt(await governanceToken.balanceOf(deployer.address));
    console.log("Deployer balance :", balance);
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });