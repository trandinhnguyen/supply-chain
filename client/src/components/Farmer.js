import React, { useState } from "react";
import { noneFilter, productState, stateToString } from "../utils/constants";

const Farmer = (props) => {
  const account = props.account;
  const owner = props.owner;
  const contract = props.contract;
  const [message, setMessage] = useState();
  const [productList, setProductList] = useState([]);

  const addProduct = async (event) => {
    event.preventDefault();
    await contract
      .produceProduct(
        event.target.productName.value,
        event.target.productPrice.value,
        event.target.productCode.value
      )
      .then((result) => alert("Add product successfully !!!"))
      .catch((err) => alert("You don't have Farmer Role"));
  };

  const getMyProductList = async () => {
    setProductList([]);
    await contract
      .getAllFarmerProduct(account)
      .then((result) =>
        result.map(async (x) => {
          if (x != 0)
            await contract.getProductDetail(x).then((result) => {
              setProductList((productList) => [...productList, result]);
              //setProductList(result)
              console.log(productList[1]);
            });
        })
      )
      .catch((err) => alert("This account don't have Farmer Role"));
  };

  const renderProductListData = () => {
    return productList.map((product) => {
      return (
        <tr key={product[0]} className="table-body">
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
            {product[3] == productState.PurchasedByDistributor ? (
              <button onClick={() => shipProduct(product[0])}>
                {" "}
                Ship product{" "}
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
        if (index > 11 && index < 24) return <th key={index}>{key}</th>;
      });
    } catch (err) {
      return null;
    }
  };

  const shipProduct = async (uid) => {
    await contract
      .shipByFarmer(uid)
      .then((result) => alert("Ship to distributor successfully !!!"))
      .catch((err) =>
        alert(
          "Can't ship product because You aren't farmer or no distributor avalable"
        )
      );
  };

  return (
    <div className="Farmer-container">
      <h3>Farmer Page</h3>
      <form onSubmit={addProduct}>
        <input id="productName" type="text" placeholder="Product name" />
        <br></br>
        <input id="productPrice" type="number" placeholder="Product price" />
        <br></br>
        <input id="productCode" type="text" placeholder="Product code" />
        <br></br>
        <button type={"submit"} className="btn-form">
          {" "}
          Add Product{" "}
        </button>
      </form>
      <button onClick={getMyProductList} className="btn-form">
        {" "}
        Get My Products{" "}
      </button>
      <h5>{message}</h5>
      <table className="table-farmer">
        <tbody>
          <tr className="table-header">{renderTableHeader()}</tr>
          {renderProductListData()}
        </tbody>
      </table>
    </div>
  );
};
export default Farmer;
