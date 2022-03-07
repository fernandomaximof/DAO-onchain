const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("deploy", "DEPLOYS THE GovernanceToken CONTRACT").setAction(async function (taskArguments, hre) {
  const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken", getAccount());
  const governanceToken = await GovernanceToken.deploy();
  console.log(`CONTRACT DEPLOYED TO ADDRESS: ${governanceToken.address}`);
  governanceToken.delegate("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199")
  console.log(`DELEGATED`)
});

// task("delegate", "DEPLOYS THE GovernanceToken CONTRACT").setAction(async function (taskArguments, hre) {
//   const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken", getAccount());
//   const transactionResponse = await GovernanceToken._delegate("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
//   await transactionResponse.wait(1);
//   console.log(`Checkpoints: ${await GovernanceToken.numCheckpoints(delegatedAccount)}`);
// });