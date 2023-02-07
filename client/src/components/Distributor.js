import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
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

export const Distributor = (props) => {
  const [distributor, setDistributor] = useState(null);
  //   const [product, setProduct] = useState(null);
  const [allProduct, setAllProduct] = useState([]);

  const getAllProduct = async (account) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      const products = await supplyChainContract.getAllFarmerProduct(
        account
      );

      products.map(async (uid) => {
        await supplyChainContract
          .getProductDetail(uid)
          .then((detail) =>
            setAllProduct((allProduct) => [
              ...allProduct,
              parseInt(detail[0], 16),
            ])
          );
      });

      //   console.log(allProduct);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const getDistributorDetail = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const distributor = await supplyChainContract.getDistributorInfo(
        e.target.distributor.value
      );

      setDistributor(distributor);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const getProductDetail = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const product = await supplyChainContract.getProductDetail(
        e.target.uid.value
      );

      //   product.wait();
      console.log(product);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const purchaseProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const product = await supplyChainContract.purchaseByDistributor(
        e.target.uid.value
      );

      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const receiveProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const product = await supplyChainContract.receiveByDistributor(
        e.target.uid.value
      );

      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  useEffect(() => {
    getAllProduct(props.account);
  }, []);

  return (
    <div>
      <h1>Distributor</h1>

      <div>
        <div>
          <h3> Get My Product</h3>
          <button onClick={getAllProduct}>Get My Product</button>
          {allProduct}
        </div>

        <div>
          <h3>My Info</h3>
          <form onSubmit={getDistributorDetail}>
            <label for="distributor"> Account: </label>
            <input id="distributor" type="text"></input>
            <button type="submit"> Get Distributor's Detail</button>
          </form>
          {distributor}
        </div>

        <div>
          <h3>Purchase Product</h3>
          <form onSubmit={purchaseProduct}>
            <label for="uid"> Uid: </label>
            <input id="uid" type="number"></input>
            <button type="submit">Purchase</button>
          </form>
        </div>
        <div>
          <h3>Product Detail</h3>
          <form onSubmit={getProductDetail}>
            <label for="uid"> Uid: </label>
            <input id="uid" type="number"></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
