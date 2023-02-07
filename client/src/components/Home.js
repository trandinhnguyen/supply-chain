import React, { useState } from "react";
import { ethers } from "ethers";
// import SupplyChainContract from "./utils/SupplyChain.json";
import { contractABI, contractAddress } from "../utils/constants";

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

  // const [contract, setContract] = useState(null);

  const connectWalletHandler = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnButtonText("Wallet Connected");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }

    // ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .then((result) => {
    //     accountChangedHandler(result[0]);
    //     setConnButtonText("Wallet Connected");
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //   });
  };

  // const accountChangedHandler = (newAccount) => {
  //   setCurrentAccount(newAccount);
  // };

  const addFarmer = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const supplyChainHash = await supplyChainContract.addFarmer(
        e.target.farmer.value,
        e.target.farmerName.value,
        e.target.farmerRealAddress.value
      );

      await supplyChainHash.wait();
      // window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const addProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const supplyChainHash = await supplyChainContract.produceProduct(
        e.target.name.value,
        e.target.price.value,
        e.target.code.value
      );

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

export default Home;
