import React, {useState} from 'react'
import {productState} from '../utils/constants'

const Customer = (props) => {
    const account=props.account
    const contract = props.contract
    const [message, setMessage] = useState()
    const [purchaseableProducts, setPurchaseableProducts] = useState([])
    const [myProducts, setMyProducts] = useState([])
    
    const getPurchaseableProducts = async () =>{
        setPurchaseableProducts([])
        await contract.getAllProductByState(productState.ReceivedByRetailer)
        .then(result => result.map(async (x) => {
            if(x != 0)
            await contract.getProductDetail(x).then(result => {
                setPurchaseableProducts(purchaseableProducts => [...purchaseableProducts, result]);
            }
            )
        }))
        .catch(err => setMessage("Failed to fetch products"))
    }

    const getMyProductList = async () =>{
        setMyProducts([])
        await contract.getAllCustomerProduct(account)
        .then(result => result.map(async (x) => {
            await contract.getProductDetail(x).then(result => {
                setMyProducts(myProducts => [...myProducts, result]);
            }
            )
        }))
        .catch(err => setMessage("This account doesn't have Customer Role"))
    }

    const purchaseProduct = async (uid) => {
        await contract.purchaseByCustomer(uid)
        .then(result => setMessage("Purchase successfully !!!"))
        .catch(err => setMessage("An error occured, please try again later"));
    }

    const receiveProduct = async (uid) => {
        await contract.receiveByCustomer(uid)
        .then(result => setMessage("Received successfully !!!"))
        .catch(err => setMessage("An error occured, please try again later"));
    }

    const renderProductListData = (productList, condition, action) => {
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
                    {product[3] == condition ? (<button onClick={() => action(product[0])}> Ship product </button>) : null}
                    
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
                return null
            })
        }
        catch(err){
            return null
        }
    }
    return (
        <div>
            <h3>Customer Page</h3>
            <button onClick={getPurchaseableProducts}> View My Products </button>
            <h5>{message}</h5>
            <table>
                <tbody>
                    <tr>{renderTableHeader(purchaseableProducts)}</tr>
                    {renderProductListData(purchaseableProducts, productState.ReceivedByRetailer, purchaseProduct)}
                </tbody>
            </table>
            <button onClick={getMyProductList}> Get My Products </button>
            <h5>{message}</h5>
            <table>
                <tbody>
                    <tr>{renderTableHeader(myProducts)}</tr>
                    {renderProductListData(myProducts, productState.ShippedByRetailer, receiveProduct)}
                </tbody>
            </table>
        </div>
    );

}

export default Customer