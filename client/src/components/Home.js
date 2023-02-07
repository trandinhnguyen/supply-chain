import React, { useState } from "react";
import { ethers } from "ethers";
// import SupplyChainContract from "./utils/SupplyChain.json";
import { contractABI, contractAddress } from "../utils/constants";
import { NavLink } from "react-router-dom";

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const supplyChainContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return supplyChainContract;
};

const Home = () => {
  // const [errorMessage, setErrorMessage] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentOwner, setCurrentOwner] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [product, setProduct] = useState(null);

  // const contractAddress ="0x64a4293c4002923dAE40cDc286Da8CD7cdB9D375"

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  // const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  // const [currentOwner, setCurrentOwner] = useState(null);

  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);
  // const [contract, setContract] = useState(null);

  // const connectWalletHandler=()=>{
  //     if(window.ethereum){
  //         window.ethereum.request({ method: 'eth_requestAccounts'})
  //         .then(result => {
  // 			accountChangedHandler(result[0]);
  // 			setConnButtonText('Wallet Connected');
  // 		})
  // 		.catch(error => {
  // 			setErrorMessage(error.message);

  // 		});
  //     }
  //     else{
  //         setErrorMessage("Need to install Metamask")
  //     }
  // }

  // const accountChangedHandler = (newAccount) => {
  // 	setDefaultAccount(newAccount);
  //     updateEthers();
  // }

  // const updateEthers = () => {
  // 	let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  // 	setProvider(tempProvider);

  // 	let tempSigner = tempProvider.getSigner();
  // 	setSigner(tempSigner);

  // 	let tempContract = new ethers.Contract(contractAddress, SupplyChainContract.abi, tempSigner);
  // 	setContract(tempContract);
  // }

  // const addFarmer = (event) => {
  // 	event.preventDefault();
  // 	contract.addFarmerRole(event.target.addFarmer.value);
  // }

  // const getCurrentOwner = async () => {
  // 	let val = await contract.owner();
  // 	setCurrentOwner(val);
  // }

  return (
    <div>
      <div className="content">
        <h3>Visit as:</h3>
        <ul className="menu">
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/farmer">Farmer</NavLink>
          </li>
          <li>
            <NavLink to="/distributor">Distributor</NavLink>
          </li>
        </ul>
        <hr />
      </div>
      {/* <form onSubmit={addFarmer}>
				<input id="addFarmer" type="text"/>
				<button type={"submit"}> Add Farmer </button>
			</form>
            <button onClick={getCurrentOwner}> Get Current Contract Owner </button>
            {currentOwner}
            {errorMessage} */}
    </div>
  );
};

/*
      await supplyChainHash.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
};


  const getCurrentOwner = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      const owner = await supplyChainContract.owner();
      setCurrentOwner(owner);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const getFarmerInfo = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();

      const farmInfo = await supplyChainContract.getFarmerInfo(
        e.target.farmer.value
      );

      setFarmer(farmInfo);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const getProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();

      const productDetail = await supplyChainContract.getProductDetail(
        e.target.uid.value
      );

      setProduct([productDetail.productName]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  return (
    <div>
      <h3>Connect to MetaMask</h3>
      {currentAccount ? (
        <p>{connButtonText}</p>
      ) : (
        <button onClick={connectWalletHandler}>Connect Wallet</button>
      )}
      <p>Wallet's Account: {currentAccount}</p>

      <div>
        <h3>Add Farmer</h3>
        <form onSubmit={addFarmer}>
          <label for="farmer">Account: </label>
          <input id="farmer" type="text" />
          <br></br>
          <label for="farmerName">Name: </label>
          <input id="farmerName" type="text" />
          <br />
          <label for="farmerRealAddress">Address: </label>
          <input id="farmerRealAddress" type="text" />
          <br />
          <button type={"submit"}> Add Farmer </button>
        </form>
      </div>

      <div>
        <h3>Current Owner</h3>
        <button onClick={getCurrentOwner}> Get Current Contract Owner </button>
        {currentOwner}

        <h3>Get Farmer's Info</h3>
        <form onSubmit={getFarmerInfo}>
          <input id="farmer" type="text" />
          <button type={"submit"}> Get Farmer's Info </button>
        </form>
        {farmer}
      </div>

      <div>
        <h3>Produce A Product</h3>
        <form onSubmit={addProduct}>
          <label for="name"> Name: </label>
          <input id="name" type="text"></input>
          <label for="price"> Price: </label>
          <input id="price" type="text"></input>
          <label for="code"> code: </label>
          <input id="code" type="text"></input>
          <button type="submit"> Add Product</button>
        </form>
      </div>

      <div>
        <h3>Product's Detail</h3>
        <form onSubmit={getProduct}>
          <label for="uid"> uid: </label>
          <input id="uid" type="number"></input>
          <button type="submit"> Get Product's Detail</button>
        </form>
        {product}
      </div>
    </div>
  );
};
*/

export default Home;
