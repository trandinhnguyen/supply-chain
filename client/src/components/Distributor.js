import React, { useState } from "react";
import { productState, noneFilter, stateToString } from "../utils/constants";

const { ethereum } = window;

const TableHead = () => {
  return (
    <tr>
      <th>UID</th>
      <th>SKU</th>
      <th>Current Product Owner</th>
      <th>State</th>
      <th>Name</th>
      <th>Price</th>
      <th>Code</th>
      <th>Farmer</th>
      <th>Distributor</th>
      <th>Retailer</th>
      <th>Customer</th>
      <th>Timestamp</th>
    </tr>
  );
};

const Distributor = (props) => {
  const account = props.account;
  const contract = props.contract;
  const [myProducts, setMyProducts] = useState([]);
  const [purchaseableProducts, setPurchaseableProducts] = useState([]);

  const getPurchaseableProducts = async () => {
    setPurchaseableProducts([]);
    try {
      if (!ethereum) return alert("Please install metamask");
      const uids = await contract.getAllProductByState(
        productState.ProducedByFarmer
      );
      uids.map(async (uid) => {
        if (uid !== 0)
          await contract.getProductDetail(uid).then((productDetail) => {
            setPurchaseableProducts((prevState) => [
              ...prevState,
              productDetail,
            ]);
          });
      });
    } catch (error) {
      console.log(error);
      throw Error("Fail to fecth product");
    }
  };

  const getAllProduct = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      setMyProducts([]);
      const uids = await contract.getAllDistributorProduct(account);
      uids.map(async (uid) => {
        if (uid !== 0)
          await contract.getProductDetail(uid).then((result) => {
            setMyProducts((prevState) => [...prevState, result]);
          });
      });
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const purchaseProduct = async (uid) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const product = await contract.purchaseByDistributor(uid);
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

  const renderProductListData = (productList) => {
    return productList.length > 0 ? (
      productList.map((product) => {
        return (
          <tr key={product[0]}>
            <td>{parseInt(product[0]._hex)}</td>
            <td>{parseInt(product[1]._hex)}</td>
            <td>{product[2]}</td>
            <td>{stateToString[product[3]]}</td>
            <td>{product[4]}</td>
            <td>{parseInt(product[5]._hex)}</td>
            <td>{parseInt(product[6]._hex)}</td>
            <td>{noneFilter(product[7])}</td>
            <td>{noneFilter(product[8])}</td>
            <td>{noneFilter(product[9])}</td>
            <td>{noneFilter(product[10])}</td>
            <td>{Date(product[11].toNumber())}</td>
            <td>
              {product[3] === productState.ProducedByFarmer ? (
                <button
                  className="btn-form"
                  onClick={() => purchaseProduct(product[0])}
                >
                  Purchase
                </button>
              ) : null}
              {product[3] === productState.ShippedByFarmer ? (
                <button
                  className="btn-form"
                  onClick={() => receiveProduct(product[0])}
                >
                  Receive
                </button>
              ) : null}
              {product[3] === productState.PurchasedByRetailer ? (
                <button
                  className="btn-form"
                  onClick={() => shipProduct(product[0])}
                >
                  Ship to Retailer
                </button>
              ) : null}
            </td>
          </tr>
        );
      })
    ) : (
      <></>
    );
  };

  return (
    <div className="Farmer-container">
      <h1>Distributor Page</h1>

      <div>
        <div>
          <h3 className="pointer" onClick={getPurchaseableProducts}>
            Market
          </h3>

          {purchaseableProducts.length > 0 ? (
            <table className="table-farmer">
              <tbody>
                <TableHead />
                {renderProductListData(purchaseableProducts)}
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>

        <div>
          <h3 className="pointer" onClick={getAllProduct}>
            My Product
          </h3>
          {myProducts.length > 0 ? (
            <table className="table-farmer">
              <tbody>
                <TableHead />
                {renderProductListData(myProducts)}
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Distributor;
