import {useState} from 'react'
import { noneFilter , stateToString } from '../utils/constants'

export default function ProductHistory(props) {
    const contract = props.contract
    const [productList, setProductList] = useState([])

    const getProductHistory = async (event) => {
        setProductList([])
		event.preventDefault();
        await contract.getProductHistoryLength(
            event.target.productUid.value
        )
        .then( async (result) => {
            for(let i = 0; i < result; i++)
            {
                await contract.getProductHistory(event.target.productUid.value, i).then(result => {
                    setProductList(productList => [...productList, result]);
                })
            }
        })
        .catch(err => alert("Invalid Uid"));
	}
    
    const renderProductListData = () => {
        return productList.map(product => {
            return (
                <tr key={product[1]}>
                  <td>{product[0]}</td>
                  <td>{stateToString[product[1]]}</td>
                  <td>{noneFilter(product[2])}</td>
                  <td>{noneFilter(product[3])}</td>
                  <td>{noneFilter(product[4])}</td>
                  <td>{noneFilter(product[5])}</td>
                  <td>{Date(product[6].toNumber())}</td>
                  </tr>
              )
        })
    }

    const renderTableHeader = () => {
        try{
            const header = Object.keys(productList[0])
            return header.map((key, index) => {
                if(index>6) return <th key={index}>{key}</th>;
                return null;
            })
        }
        catch(err){
            return null
        }
      }

    return (
        <div className='Farmer-container'>
            <form onSubmit={getProductHistory}>
                <label htmlFor="productUid">Product Uid</label>
                <br></br>
                <input id="productUid" type="text"/>
                <br></br>
                <button type={"submit"} className="btn-form"> Get Product History </button>
            </form>
            <table className='table-farmer'>
                <tbody>
                    <tr className='table-header'>{renderTableHeader()}</tr>
                    {renderProductListData()}
                </tbody>
            </table>
        </div>
    );
}