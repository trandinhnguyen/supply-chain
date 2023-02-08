import React, { useState } from "react";

const Admin = (props) => {
  const account = props.account;
  const owner = props.owner;
  const contract = props.contract;
  const [message, setMessage] = useState();

  const addFarmer = async (event) => {
    event.preventDefault();
    await contract
      .addFarmer(
        event.target.farmer.value,
        event.target.farmerName.value,
        event.target.farmerRealAddress.value
      )
      .then((result) => setMessage("Add Farmer successfully !!!"))
      .catch((err) => {
        setMessage("Can't add Farmer");
        alert(message);
      });
  };

  const addDistributor = async (event) => {
    event.preventDefault();
    await contract
      .addDistributor(
        event.target.distributor.value,
        event.target.distributorName.value,
        event.target.distributorRealAddress.value
      )
      .then((result) => setMessage("Add Distributor successfully !!!"))
      .catch((err) => {
        setMessage("Can't add Distributor");
        alert(message);
      });
  };

  const addRetailer = async (event) => {
    event.preventDefault();
    await contract
      .addRetailer(
        event.target.retailer.value,
        event.target.retailerName.value,
        event.target.retailerRealAddress.value
      )
      .then((result) => setMessage("Add Retailer successfully !!!"))
      .catch((err) => {
        setMessage("Can't add Retailer");
        alert(message);
      });
  };

  // Hàm add Customer không nhận tên và địa chỉ thực, chỉ nhận địa chỉ ví
  const addCustomer = async (event) => {
    event.preventDefault();
    await contract
      .addCustomer(event.target.customer.value)
      .then((result) => setMessage("Add Customer successfully !!!"))
      .catch((err) => {
        setMessage("Can't add Customer");
        alert(message);
      });
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <h3>Add Farmer</h3>
        <form onSubmit={addFarmer}>
          <label htmlFor="farmer">Account: </label>
          <input id="farmer" type="text" />
          <br></br>
          <label htmlFor="farmerName">Name: </label>
          <input id="farmerName" type="text" />
          <br></br>
          <label htmlFor="farmerRealAddress">Address: </label>
          <input id="farmerRealAddress" type="text" />
          <br></br>
          <button type={"submit"}> Add Farmer </button>
        </form>
      </div>

      <div>
        <h3>Add Distributor</h3>
        <form onSubmit={addDistributor}>
          <label htmlFor="distributor">Account: </label>
          <input id="distributor" type="text" />
          <br></br>
          <label htmlFor="distributorName">Name: </label>
          <input id="distributorName" type="text" />
          <br></br>
          <label htmlFor="distributorRealAddress">Address: </label>
          <input id="distributorRealAddress" type="text" />
          <br></br>
          <button type={"submit"}> Add Distributor </button>
        </form>
      </div>

      <div>
        <h3>Add Retailer</h3>
        <form onSubmit={addRetailer}>
          <label htmlFor="retailer">Account: </label>
          <input id="retailer" type="text" />
          <br></br>
          <label htmlFor="retailerName">Name: </label>
          <input id="retailerName" type="text" />
          <br></br>
          <label htmlFor="retailerRealAddress">Address: </label>
          <input id="retailerRealAddress" type="text" />
          <br></br>
          <button type={"submit"}> Add Retailer </button>
        </form>
      </div>
      <div>
        <h3>Add Customer</h3>
        <form onSubmit={addCustomer}>
          <label htmlFor="customer">Account: </label>
          <input id="customer" type="text" />
          <br></br>
          <button type={"submit"}> Add Customer </button>
        </form>
      </div>
    </div>
  );
};
export default Admin;
