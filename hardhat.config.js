/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
// require("./scripts/deploy.js");

const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY,  ETHERSCAN_API_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "rinkeby",
   networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    ethereum: {
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
}