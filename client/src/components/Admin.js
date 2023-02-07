import React, {useState} from 'react'
const Admin = (props) => {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()

    const addFarmer = async (event) => {
		event.preventDefault();
        //contract.addFarmerRole(event.target.addFarmer.value);
        let hasFarmerRole = await contract.hasFarmerRole(event.target.addFarmer.value)
        if(hasFarmerRole){
            setMessage("This account has been assigned to Farmer Role before")
        }
        else{
            await contract.addFarmerRole(event.target.addFarmer.value);
            setMessage("Add Farmer successfully !!!")
        }
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
				<input id="addFarmer" type="text"/>
				<button type={"submit"}> Add Farmer </button>
			</form>
            <h5>{message}</h5>
        </div>
    )
}

export default Admin