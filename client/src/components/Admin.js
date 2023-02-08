import React, {useState} from 'react'
const Admin = (props) => {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()

    const addFarmer = async (event) => {
		event.preventDefault();
        await contract.addFarmer(event.target.farmer.value,
            event.target.farmerName.value,
            event.target.farmerRealAddress.value
        )
        .then(result => setMessage("Add Farmer successfully !!!"))
        .catch(err => {
            setMessage("Cannot add farmer");
        });
	}

    // if(account!=owner){
    //     return(
    //         <div>
    //             <h3>You are not Admin</h3>
    //         </div>
    //     )
    // }
    return(
        <div>
            <h3>Admin Page</h3>
            <form onSubmit={addFarmer}>
                <label htmlFor="farmer">Account: </label>
				<input id="farmer" type="text"/>
                <br></br>
                <label htmlFor="farmerName">Name: </label>
                <input id="farmerName" type="text"/>
                <br></br>
                <label htmlFor="farmerRealAddress">Address: </label>
                <input id="farmerRealAddress" type="text"/>
                <br></br>
				<button type={"submit"}> Add Farmer </button>
			</form>
            <h5>{message}</h5>
        </div>
    )
}

export default Admin