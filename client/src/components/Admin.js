import React, { useState } from "react";
const Admin = (props) => {
  const account = props.account;
  const owner = props.owner;
  const contract = props.contract;
  const [message, setMessage] = useState();

    const addFarmer = async (event) => {
		event.preventDefault();
        await contract.addFarmer(event.target.farmer.value,
            event.target.farmerName.value,
            event.target.farmerRealAddress.value
        )
        .then(result => setMessage("Add Farmer successfully !!!"))
        .catch(err => {
            alert("Can't add Farmer");
        });
	}

    const addDistributor = async (event) => {
		event.preventDefault();
        await contract.addDistributor(event.target.distributor.value,
            event.target.distributorName.value,
            event.target.distributorRealAddress.value
        )
        .then(result => setMessage("Add Distributor successfully !!!"))
        .catch(err => {
            alert("Can't add Distributor");
        });
	}

    const addRetailer = async (event) => {
		event.preventDefault();
        await contract.addRetailer(event.target.retailer.value,
            event.target.retailerName.value,
            event.target.retailerRealAddress.value
        )
        .then(result => setMessage("Add Retailer successfully !!!"))
        .catch(err => {
            alert("Can't add Retailer");
        });
	}

    const addCustomer = async (event) => {
		event.preventDefault();
        await contract.addCustomer(event.target.customer.value,
            event.target.customerName.value,
            event.target.customerRealAddress.value
        )
        .then(result => setMessage("Add Customer successfully !!!"))
        .catch(err => {
            alert("Can't add Customer");
        });
	}

    return(
        <div className='container-form'>
            <div className='container-form-item'>
                <h3 className='header-form'>Add Farmer</h3>
                <form onSubmit={addFarmer}>
                    <input id="farmer" type="text" placeholder='Account'/>
                    <br></br>
                    <input id="farmerName" type="text" placeholder='Name'/>
                    <br></br>
                    <input id="farmerRealAddress" type="text" placeholder='Address'/>
                    <br></br>
                    <button type={"submit"} className="btn-form"> Add Farmer </button>
                </form>
            </div>
            <div className='container-form-item'>
                <h3 className='header-form'>Add Distributor</h3>
                <form onSubmit={addDistributor}>
                    <input id="distributor" type="text" placeholder='Account'/>
                    <br></br>
                    <input id="distributorName" type="text" placeholder='Name'/>
                    <br></br>
                    <input id="distributorRealAddress" type="text" placeholder='Address'/>
                    <br></br>
                    <button type={"submit"} className="btn-form"> Add Distributor </button>
                </form>
            </div>
            <div className='container-form-item'>
                <h3 className='header-form'>Add Retailer</h3>
                <form onSubmit={addRetailer}>
                    <input id="retailer" type="text" placeholder='Account'/>
                    <br></br>
                    <input id="retailerName" type="text" placeholder='Name'/>
                    <br></br>
                    <input id="retailerRealAddress" type="text" placeholder='Address'/>
                    <br></br>
                    <button type={"submit"} className="btn-form"> Add Retailer </button>
                </form>
            </div>
            <div className='container-form-item'>
                <h3 className='header-form'>Add Customer</h3>
                <form onSubmit={addCustomer}>
                    <input id="customer" type="text" placeholder='Account'/>
                    <br></br>
                    <input id="customerName" type="text" placeholder='Name'/>
                    <br></br>
                    <input id="customerRealAddress" type="text" placeholder='Address'/>
                    <br></br>
                    <button type={"submit"} className="btn-form"> Add Customer </button>
                </form>
            </div>
        </div>
    )
}

export default Admin
