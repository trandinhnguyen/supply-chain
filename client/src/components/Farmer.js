import React, {useState} from 'react'
const Farmer = (props) => {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()
    const [productList, setProductList] = useState([])

    const addProduct = async (event) => {
		event.preventDefault();
        await contract.produceProduct(
            event.target.productName.value,
            event.target.productPrice.value,
            event.target.productCode.value
        )
        .then(result => setMessage("Add product successfully !!!"))
        .catch(err => setMessage("You don't have Farmer Role"));
	}

    const getMyProductList = async () =>{
        await contract.getAllFarmerProduct(account)
        .then(result => result.map(async (x) => {
            await contract.getProductDetail(x).then(result => {
                setProductList(productList => [...productList, result]);
                console.log(productList)
            }
            )
        }))
        .catch(err => setMessage("This account don't have Farmer Role"))
    }

    return(
        <div>
            <h3>Farmer Page</h3>
            <form onSubmit={addProduct}>
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
            <button onClick={getMyProductList}> Get My Products </button>
            <h5>{message}</h5>
            {productList[0].farmer}
        </div>
    )
}

export default Farmer