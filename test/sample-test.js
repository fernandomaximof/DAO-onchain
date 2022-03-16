const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO OnChain", function () {
  const MIN_DELAY = 3600;
  const VOTING_PERIOD = 5;
  const VOTING_DELAY = 1;
  const QUORUM_PERCENTAGE = 4;
  const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  
  beforeEach(async function() {
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
    await box.deployed()

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
    
  });

  // 1st Test
  it("RETRIEVE INITIAL VALUE FROM BOX CONTRACT", async() => {
    box = await Box.deploy();
    await box.deployed()
    console.log(box.address)
    // var value;

    // try {
    //   value = await box.retrieve();
    // } catch(e) {
    //   console.log(e);
    // }
    
    // expect(BigInt(value)).to.equal(0);
    
  })

  /**/
});