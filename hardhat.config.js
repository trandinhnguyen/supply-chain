require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
      viaIR: true,
    },
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/ffafa66b14454a039c3f4dbdaec43018",
      accounts: [
        "e65c7d38afc88e6ac7f46f563117fcc2dbe025b3b5288149ecb7ae4fbd632f94",
      ],
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/7SrS2JQJw1IJH-RIVOhUqV-c0ZT9qv8A",
      accounts: [
        "b97b2b435d6487b3be6a449894dcddb9e9fda69b2e4c9733ddeb689f3654278c",
      ],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "XRERNEKDF7J5ZGTQJPMCC4MD29W8MVS8FU",
    },
  },
};
