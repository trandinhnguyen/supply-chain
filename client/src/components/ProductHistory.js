import {useState} from 'react'

export default function ProductHistory(props) {
    const account=props.account
    const owner=props.owner
    const contract = props.contract
    const [message, setMessage] = useState()
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
        .catch(err => setMessage("Invalid Uid"));
	}
    
    const renderProductListData = () => {
        return productList.map(product => {
            return (
                <tr key={product[0]}>
                  <td>{product[0]}</td>
                  <td>{product[1]}</td>
                  <td>{product[2] != 0 ? product[2] : 'None'}</td>
                  <td>{product[3] != 0 ? product[3] : 'None'}</td>
                  <td>{product[4] != 0 ? product[4] : 'None'}</td>
                  <td>{product[5] != 0 ? product[5] : 'None'}</td>
                  <td>{Date(product[6].toNumber())}</td>
                  </tr>
              )
        })
    }

    const renderTableHeader = () => {
        try{
            const header = Object.keys(productList[0])
            return header.map((key, index) => {
                if(index>6) return <th key={index}>{key}</th>
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
            <h5>{message}</h5>
            <table className='table-farmer'>
                <tbody>
                    <tr className='table-header'>{renderTableHeader()}</tr>
                    {renderProductListData()}
                </tbody>
            </table>
        </div>
    );
}