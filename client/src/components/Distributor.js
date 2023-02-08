import React, { useEffect, useState } from "react";
import { productState } from "../utils/constants";

const { ethereum } = window;

const Distributor = (props) => {
  const account = props.account;
  const contract = props.contract;
  const [productList, setProductList] = useState([]);

  const getAllProduct = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      setProductList([]);
      await contract
        .getAllDistributorProduct(account)
        .then((result) =>
          result.map(async (x) => {
            if (x !== 0)
              await contract.getProductDetail(x).then((result) => {
                setProductList((productList) => [...productList, result]);
              });
          })
        )
        .catch((err) => alert("This account don't have Distributor Role"));
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const purchaseProduct = async (e) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      e.preventDefault();
      const product = await contract.purchaseByDistributor(e.target.uid.value);

      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const receiveProduct = async (uid) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const product = await contract.receiveByDistributor(uid);
      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const shipProduct = async (uid) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const product = await contract.shipByDistributor(uid);
      product.wait();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const renderProductListData = () => {
    return productList.map((product) => {
      return (
        <tr key={product[0]} className="table-body">
          <td>{parseInt(product[0]._hex)}</td>
          <td>{parseInt(product[1]._hex)}</td>
          <td>{product[2]}</td>
          <td>{product[3]}</td>
          <td>{product[4]}</td>
          <td>{parseInt(product[5]._hex)}</td>
          <td>{parseInt(product[6]._hex)}</td>
          <td>{product[7]}</td>
          <td>{product[8]}</td>
          <td>{product[9]}</td>
          <td>{product[10]}</td>
          <td>{Date(product[11].toNumber())}</td>
          <td>
            {product[3] === productState.ShippedByFarmer ? (
              <button onClick={() => receiveProduct(product[0])}>
                Receive
              </button>
            ) : null}
            {product[3] === productState.PurchasedByRetailer ? (
              <button onClick={() => shipProduct(product[0])}>
                Ship to Retailer
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

  return (
    <div className="Farmer-container">
      <h2>Distributor Page</h2>

      <div>
        <div>
          <h4>Purchase Product</h4>
          <form onSubmit={purchaseProduct}>
            <label htmlFor="uid"> UID: </label>
            <input id="uid" type="number" required></input>
            <button type="submit" className="btn-form">
              Purchase
            </button>
          </form>
        </div>

        <div>
          <h4>My Product</h4>
          <button onClick={getAllProduct} className="btn-form">
            Show
          </button>
        </div>

        <table className="table-farmer">
          <tbody>
            <tr className="table-header">{renderTableHeader()}</tr>
            {renderProductListData()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Distributor;
