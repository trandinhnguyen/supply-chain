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
      .then((result) => setMessage("Add Farmer successfully !!!"));
    /*.catch(err => () => {
            setMessage(""/*"This account has been assigned to Farmer Role before");
            console.log(err);
        });
        */
  };
  const addDistributor = async (event) => {
    event.preventDefault();
    await contract
      .addDistributor(
        event.target.farmer.value,
        event.target.farmerName.value,
        event.target.farmerRealAddress.value
      )
      .then((result) => setMessage("Add Distributor successfully !!!"));
    /*.catch(err => () => {
            setMessage(""/*"This account has been assigned to Farmer Role before");
            console.log(err);
        });
        */
  };

  // if(account!=owner){
  //     return(
  //         <div>
  //             <h3>You are not Admin</h3>
  //         </div>
  //     )
  // }
  return (
    <div>
      <h3>Admin Page</h3>
      <form onSubmit={addFarmer}>
        <label for="farmer">Account: </label>
        <input id="farmer" type="text" />
        <br></br>
        <label for="farmerName">Name: </label>
        <input id="farmerName" type="text" />
        <br></br>
        <label for="farmerRealAddress">Address: </label>
        <input id="farmerRealAddress" type="text" />
        <br></br>
        <button type={"submit"}> Add Farmer </button>
      </form>
      <form onSubmit={addDistributor}>
        <label for="farmer">Account: </label>
        <input id="farmer" type="text" />
        <br></br>
        <label for="farmerName">Name: </label>
        <input id="farmerName" type="text" />
        <br></br>
        <label for="farmerRealAddress">Address: </label>
        <input id="farmerRealAddress" type="text" />
        <br></br>
        <button type={"submit"}> Add Distributor </button>
      </form>
      <h5>{message}</h5>
    </div>
  );
};

export default Admin;
