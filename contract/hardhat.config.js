require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const fs = require("fs");
let mnemonic = fs.readFileSync(".secrets").toString().trim();
let infuraProjectID = fs.readFileSync(".infura").toString().trim();

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectID}`,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  },
  etherscan: {
    apiKey: {
      sepolia: fs.readFileSync(".etherscan").toString().trim(),
    },
  },
};
