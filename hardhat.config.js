require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: "https://eth-goerli.g.alchemy.com/v2/7SrS2JQJw1IJH-RIVOhUqV-c0ZT9qv8A",
      accounts: [
        "b97b2b435d6487b3be6a449894dcddb9e9fda69b2e4c9733ddeb689f3654278c",
      ],
    },
  },
};
