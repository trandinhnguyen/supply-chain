// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");

  const gasPrice = await SupplyChain.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await SupplyChain.signer.estimateGas(
    SupplyChain.getDeployTransaction(),
  );
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice * estimatedGas;
  const deployerBalance = await SupplyChain.signer.getBalance();
  const deployerAddress = await SupplyChain.signer.getAddress();
  
  console.log(`Deployer address:  ${deployerAddress}`);
  console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  // console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  // if (deployerBalance.lt(deploymentPrice)) {
  //   throw new Error(
  //     `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
  //       deploymentPrice - deployerBalance,
  //     )}`,
  //   );
  // }

  const supplyChain = await SupplyChain.deploy();

  await supplyChain.deployed();

  console.log(
    `Contract deployed to ${supplyChain.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
