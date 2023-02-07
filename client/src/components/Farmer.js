import React, {useState} from 'react'
const Farmer = (props) => {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()

    const addProduct = async (event) => {
		event.preventDefault();
        await contract.produceProduct(
            // event.target.farmerName.value,
            // event.target.farmerAddress.value,
            event.target.productName.value,
            event.target.productPrice.value,
            event.target.productCode.value
        )
        .then(result => setMessage("Add product successfully !!!"))
        .catch(err => setMessage("You don't have Farmer Role"));
	}

    return(
        <div>
            <h3>Admin Page</h3>
            <form onSubmit={addProduct}>
                <label htmlFor="farmerName">Farmer name</label>
				<input id="farmerName" type="text"/>
                <br></br>
                <label htmlFor="farmerAddress">Farmer address</label>
                <input id="farmerAddress" type="text"/>
                <br></br>
                <label htmlFor="productName">Product name</label>
                <input id="productName" type="text"/>
                <br></br>
                <label htmlFor="productPrice">Product price</label>
                <input id="productPrice" type="number"/>
                <br></br>
                <label htmlFor="productCode">Product code</label>
                <input id="productCode" type="text"/>
                <br></br>
				<button type={"submit"}> Add Product </button>
			</form>
            <h5>{message}</h5>
        </div>
    )
}

export default Farmer