require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    sepolia:{
      url: "https://sepolia.infura.io/v3/ffafa66b14454a039c3f4dbdaec43018",
      accounts: ["e65c7d38afc88e6ac7f46f563117fcc2dbe025b3b5288149ecb7ae4fbd632f94"]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: '2RI1Z9ANH7FY2QY3QJI9YJQ7HCRGVSCAZ5'
    }
  }
};
