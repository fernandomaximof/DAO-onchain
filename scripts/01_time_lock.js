const { MIN_DELAY } = require('./helper_hardhat_config');

async function main() {
    console.log(MIN_DELAY)
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const timeLock = await TimeLock.deploy(MIN_DELAY, [], []);
    console.log("TimeLock to:", timeLock.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });