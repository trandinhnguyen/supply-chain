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
                  <td>{product[2]}</td>
                  <td>{product[3]}</td>
                  <td>{product[4]}</td>
                  <td>{product[5]}</td>
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
        <div>
            <form onSubmit={getProductHistory}>
                <label htmlFor="productUid">Product Uid</label>
                <input id="productUid" type="text"/>
                <button type={"submit"}> Get Product History </button>
            </form>
            <h5>{message}</h5>
            <table>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderProductListData()}
                </tbody>
            </table>
        </div>
    );
}