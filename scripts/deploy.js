const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("deploy", "DEPLOYS THE GovernanceToken CONTRACT").setAction(async function (taskArguments, hre) {
  const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken", getAccount());
  const governanceToken = await GovernanceToken.deploy();
  console.log(`CONTRACT DEPLOYED TO ADDRESS: ${governanceToken.address}`);
});

task("delegate", "DEPLOYS THE GovernanceToken CONTRACT").setAction(async function (delegatedAccount, hre) {
  const GovernanceToken = await hre.ethers.getContractFactory("GovernanceToken", getAccount());
  const transactionResponse = await GovernanceToken.delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(`Checkpoints: ${await GovernanceToken.numCheckpoints(delegatedAccount)}`);
});