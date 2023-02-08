import React, { useEffect, useState } from "react";
import { productState } from "../utils/constants";

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
  const account = props.account;
  const [distributor, setDistributor] = useState(null);
  const [productList, setProductList] = useState([]);

  const getAllProduct = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      const products = await supplyChainContract.getAllDistributorProduct(
        account
      );
      setProductList([]);
      products.map(async (uid) => {
        if (uid !== 0) {
          await supplyChainContract
            .getProductDetail(uid)
            .then((detail) =>
              setProductList((prevState) => [...prevState, detail])
            );
        }
      });
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

  // const getProductDetail = async (uid) => {
  //   try {
  //     if (!ethereum) return alert("Please install metamask");

  //     const supplyChainContract = getEthereumContract();
  //     const product = await supplyChainContract.getProductDetail(uid);

  //     //   product.wait();
  //     // console.log(product);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object!");
  //   }
  // };

  const purchaseProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      e.preventDefault();
      const product = await supplyChainContract.purchaseByDistributor(
        e.target.uid.value
      );

      product.wait();

      getAllProduct();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const receiveProduct = async (uid) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      const product = await supplyChainContract.receiveByDistributor(uid);

      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const shipProduct = async (uid) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const supplyChainContract = getEthereumContract();
      const product = await supplyChainContract.shipByDistributor(uid);

      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const renderProductListData = () => {
    return productList.map((product) => {
      return (
        <tr key={product[0]}>
          <td>{product[0]._hex}</td>
          <td>{product[1]._hex}</td>
          <td>{product[2]}</td>
          <td>{product[3]}</td>
          <td>{product[4]}</td>
          <td>{product[5]._hex}</td>
          <td>{product[6]._hex}</td>
          <td>{product[7]}</td>
          <td>{product[8]}</td>
          <td>{product[9]}</td>
          <td>{product[10]}</td>
          <td>
            {product[3] === productState.ShippedByFarmer ? (
              <button onClick={() => receiveProduct(product[0])}>
                {" "}
                Receive product{" "}
              </button>
            ) : null}
          </td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    try {
      const header = Object.keys(productList[0]);
      return header.map((key, index) => {
        if (index > 11 && index < 23) return <th key={index}>{key}</th>;
      });
    } catch (err) {
      return null;
    }
  };

  // useEffect(() => {
  //   setProductList([]);
  //   getAllProduct();
  // }, []);

  return (
    <div>
      <h1>Distributor</h1>

      <div>
        <div>
          <h3> Get My Product</h3>
          <button onClick={getAllProduct}>Get My Product</button>
        </div>

        {/* <div>
          <h3>My Info</h3>
          <form onSubmit={getDistributorDetail}>
            <label htmlFor="distributor"> Account: </label>
            <input id="distributor" type="text"></input>
            <button type="submit"> Get Distributor's Detail</button>
          </form>
          {distributor}
        </div> */}

        <div>
          <h3>Purchase Product</h3>
          <form onSubmit={purchaseProduct}>
            <label htmlFor="uid"> Uid: </label>
            <input id="uid" type="number" required></input>
            <button type="submit">Purchase</button>
          </form>
        </div>

        {/* <div>
          <h3>Product Detail</h3>
          <form onSubmit={getProductDetail}>
            <label htmlFor="uid"> Uid: </label>
            <input id="uid" type="number"></input>
            <button type="submit">Submit</button>
          </form>
        </div> */}

        <table>
          <tbody>
            <tr>{renderTableHeader()}</tr>

            {productList.map((product) => (
              <tr key={product[0]}>
                <td>{product[0]._hex}</td>
                <td>{product[1]._hex}</td>
                <td>{product[2]}</td>
                <td>{product[3]}</td>
                <td>{product[4]}</td>
                <td>{product[5]._hex}</td>
                <td>{product[6]._hex}</td>
                <td>{product[7]}</td>
                <td>{product[8]}</td>
                <td>{product[9]}</td>
                <td>{product[10]}</td>
                <td>
                  {product[3] === productState.ShippedByFarmer ? (
                    <button onClick={() => receiveProduct(product[0])}>
                      {" "}
                      Received product{" "}
                    </button>
                  ) : null}
                  {product[3] === productState.PurchasedByRetailer ? (
                    <button onClick={() => shipProduct(product[0])}>
                      {" "}
                      Ship to Retailer{" "}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
