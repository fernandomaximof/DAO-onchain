const { MIN_DELAY, VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE } = require('./helper_hardhat_config');

async function main() {
    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const GovernorContract = await ethers.getContractFactory("GovernorContract");
    
    const governanceToken = await GovernanceToken.deploy();
    const timeLock = await TimeLock.deploy(MIN_DELAY, [], []);
    const governorContract = await GovernorContract.deploy(governanceToken.address, 
        timeLock.address, 
        QUORUM_PERCENTAGE, 
        VOTING_PERIOD, 
        VOTING_DELAY);

    console.log("GovernanceToken to:", governanceToken.address);
    console.log("TimeLock to:", timeLock.address);
    console.log("GovernorContract to:", governorContract.address);

    const [ deployer ] = await ethers.getSigners();
    await governanceToken.delegate(deployer.address);
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });