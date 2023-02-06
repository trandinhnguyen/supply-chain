import { Contract, ethers } from  "ethers";
import SupplyChainContract from  './artifacts/SupplyChain.json'

export  default  function getContract(contractAddress: string): Contract {
    const provider = ethers.getDefaultProvider(`https://sepolia.infura.io/v3/ffafa66b14454a039c3f4dbdaec43018`)
    // const signer = provider.getSigner();

    // console.log(signer)

    const contract = new ethers.Contract(
    contractAddress,
    SupplyChainContract.abi,
    provider
    );

    return contract;
}