import React, {useState} from 'react'
import {productState} from '../utils/constants'
import {BigNumber} from 'ethers'

const Customer = (props) => {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()
    const [purchaseableProducts, setPurchaseableProducts] = useState([])
    
    const getPurchaseableProducts = async () =>{
        setPurchaseableProducts([])
        await contract.getAllProductByState(productState.ProducedByFarmer)
        .then(result => result.map(async (x) => {
            await contract.getProductDetail(x).then(result => {
                setPurchaseableProducts(purchaseableProducts => [...purchaseableProducts, result]);
            }
            )
        }))
        .catch(err => setMessage("Failed to fetch products"))
    }

    const purchaseProduct = async (uid) => {
        await contract.purchaseByCustomer(uid)
        .then(result => setMessage("Purchase successfully !!!"))
        .catch(err => setMessage("An error occured, please try again"));
    }

    const renderProductListData = (productList) => {
        return productList.length > 0 ? productList.map(product => {
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
                    <button onClick={() => purchaseProduct(product[0])}> Buy product </button>
                  </td>
                </tr>
              )
              
        }) : <></>
    }

    const renderTableHeader = (productList) => {
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
    return (
        <div>
            <h3>Customer Page</h3>
            <button onClick={getPurchaseableProducts}> Get Purchaseable Products </button>
            <h5>{message}</h5>
            <table>
                <tbody>
                    <tr>{renderTableHeader(purchaseableProducts)}</tr>
                    {renderProductListData(purchaseableProducts)}
                </tbody>
            </table>
        </div>
    );

}

export default Customer