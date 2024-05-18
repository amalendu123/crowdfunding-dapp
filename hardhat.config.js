require("@nomicfoundation/hardhat-toolbox");
const INFURA_API_KEY = "3992e4670ba74252864098116d844c36"
const SEPOLIA_PRIVATE_KEY = "cc04d01d236840eb3ecddd8cb3fa25b20036d4f042845344180b22cb65848e02";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
