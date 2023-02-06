import { Contract, ethers } from "ethers";
import { contractABI } from "./constants";

export default function getContract(contractAddress: string): Contract {
  const provider = ethers.getDefaultProvider(
    "https://eth-goerli.g.alchemy.com/v2/7SrS2JQJw1IJH-RIVOhUqV-c0ZT9qv8A"
  );
  // const signer = provider.getSigner();

  // console.log(signer)

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  return contract;
}
