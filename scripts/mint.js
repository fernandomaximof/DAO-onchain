const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const fetch = require("node-fetch");

task("delegate-token", "DELEGATE TOKENS")
.addParam("address", "THE ADDRESS TO RECEIVE A TOKEN")
.setAction(async function (taskArguments, hre) {
    const contract = await getContract("BShowerNFT", hre);
    const mint_price = await contract.MINT_PRICE();
    const transactionResponse = await contract.mintTo(taskArguments.address, {
        gasLimit: 500_000,
        value: mint_price
    });
    console.log(`TRANSACTION HASH: ${transactionResponse.hash}`);
});