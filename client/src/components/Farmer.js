import React, {useState} from 'react'
import {productState} from '../utils/constants'

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
        setProductList([])
        await contract.getAllFarmerProduct(account)
        .then(result => result.map(async (x) => {
            if(x != 0)
            await contract.getProductDetail(x).then(result => {
                setProductList(productList => [...productList, result]);
                //setProductList(result)
                console.log(productList[1])
            }
            )
        }))
        .catch(err => setMessage("This account doesn't have Farmer Role"))
    }

    const renderProductListData = () => {
        return productList.map(product => {
            return (
                <tr key={product[0]}>
                  <td>{product[0]._hex}</td>
                  <td>{product[1]._hex}</td>
                  <td>{product[2]}</td>
                  <td>{product[3]}</td>
                  <td>{product[4]}</td>
                  <td>{product[5]._hex}</td>
                  <td>{product[6]._hex}</td>
                  <td>{product[7]}</td>
                  <td>{product[8]}</td>
                  <td>{product[9]}</td>
                  <td>{product[10]}</td>
                  <td>
                    {product[3]==productState.PurchasedByDistributor ? (<button onClick={() => shipProduct(product[0])}> Ship product </button>) : null}
                  </td>
                </tr>
              )
        })
    }

    const renderTableHeader = () => {
        try{
            const header = Object.keys(productList[0])
            return header.map((key, index) => {
                if(index>11 && index<23) return <th key={index}>{key}</th>
            })
        }
        catch(err){
            return null
        }
      }

    const shipProduct = async (uid) => {
        await contract.shipByFarmer(uid)
        .then(result => setMessage("Ship to distributor successfully !!!"))
        .catch(err => setMessage("Can't ship product because You aren't farmer or no distributor avalable"));
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
            <table>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderProductListData()}
                </tbody>
            </table>
        </div>
    )
}

export default Farmer