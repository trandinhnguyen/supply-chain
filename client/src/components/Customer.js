import React, {useState} from 'react'
import {productState, stateToString, noneFilter} from '../utils/constants'

const Customer = (props) => {
    const account=props.account
    const contract = props.contract
    const [purchaseableProducts, setPurchaseableProducts] = useState([])
    const [myProducts, setMyProducts] = useState([])
    
    const getPurchaseableProducts = async () =>{
        setPurchaseableProducts([])
        await contract.getAllProductByState(productState.ReceivedByRetailer)
        .then(result => result.map(async (x) => {
            if(x != 0)
            await contract.getProductDetail(x).then(result => {
                setPurchaseableProducts(purchaseableProducts => [...purchaseableProducts, result]);
            })
        }))
        .catch(err => alert("Failed to fetch products"))
    }

    const getMyProductList = async () =>{
        setMyProducts([])
        await contract.getAllCustomerProduct(account)
        .then(result => result.map(async (x) => {
            await contract.getProductDetail(x).then(result => {
                setMyProducts(myProducts => [...myProducts, result]);
            })
        }))
        .catch(err => alert("This account doesn't have Customer Role"))
    }

    const purchaseProduct = async (uid) => {
        await contract.purchaseByCustomer(uid)
        .then(result => alert("Purchase successfully !!!"))
        .catch(err => alert("An error occured, please try again later"));
    }

    const receiveProduct = async (uid) => {
        await contract.receiveByCustomer(uid)
        .then(result => alert("Received successfully !!!"))
        .catch(err => alert("An error occured, please try again later"));
    }

    const renderProductListData = (productList, condition, action, actionName) => {
        return productList.length > 0 ? productList.map(product => {
            return (
                <tr key={product[0]}>
                  <td>{product[0].toNumber()}</td>
                  <td>{product[1].toNumber()}</td>
                  <td>{product[2]}</td>
                  <td>{stateToString[product[3]]}</td>
                  <td>{product[4]}</td>
                  <td>{product[5].toNumber()}</td>
                  <td>{product[6].toNumber()}</td>
                  <td>{noneFilter(product[7])}</td>
                  <td>{noneFilter(product[8])}</td>
                  <td>{noneFilter(product[9])}</td>
                  <td>{noneFilter(product[10])}</td>
                  <td>{Date((product[11].toNumber()))}</td>
                  <td>
                    {product[3] == condition ? (<button onClick={() => action(product[0])}> {actionName} </button>) : null}
                    
                  </td>
                </tr>
              )
              
        }) : <></>
    }

    const renderTableHeader = (productList) => {
        try{
            const header = Object.keys(productList[0])
            return header.map((key, index) => {
                if(index>11 && index<24) return <th key={index}>{key}</th>
                return null
            })
        }
        catch(err){
            return null
        }
    }
    return (
        <div className='Farmer-container'>
            <h3>Customer Page</h3>
            <button onClick={getPurchaseableProducts} className="btn-form"> View Purchaseable Products </button>
            <table className='table-farmer'>
                <tbody>
                    <tr className='table-header'>{renderTableHeader(purchaseableProducts)}</tr>
                    {renderProductListData(purchaseableProducts, productState.ReceivedByRetailer, purchaseProduct, 'purchase')}
                </tbody>
            </table>
            <button onClick={getMyProductList} className="btn-form"> Get My Purchased Products </button>
            <table className='table-farmer'>
                <tbody>
                    <tr className='table-header'>{renderTableHeader(myProducts)}</tr>
                    {renderProductListData(myProducts, productState.ShippedByRetailer, receiveProduct, 'confirm receive')}
                </tbody>
            </table>
        </div>
    );

}

export default Customer