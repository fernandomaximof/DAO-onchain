async function main() {
  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const governanceToken = await GovernanceToken.deploy();
  console.log("GovernanceToken to:", governanceToken.address);

  const [deployer] = await ethers.getSigners();
  await governanceToken.delegate(deployer.address);
  const balance = await governanceToken.balanceOf(deployer.address);
  console.log("Balance of Owner :", BigInt(balance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });