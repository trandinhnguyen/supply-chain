import React, {useState} from 'react'
import {ethers} from  "ethers";
import SupplyChainContract from  '../artifacts/SupplyChain.json'
import {Route, Link, NavLink} from 'react-router-dom';

const Home = () => {

    const contractAddress ="0x64a4293c4002923dAE40cDc286Da8CD7cdB9D375"

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentOwner, setCurrentOwner] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

    const connectWalletHandler=()=>{
        if(window.ethereum){
            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});
        }
        else{
            setErrorMessage("Need to install Metamask")
        }
    }

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
        updateEthers();
	}

    const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SupplyChainContract.abi, tempSigner);
		setContract(tempContract);	
	}

    const addFarmer = (event) => {
		event.preventDefault();
		contract.addFarmerRole(event.target.addFarmer.value);
	}

    const getCurrentOwner = async () => {
		let val = await contract.owner();
		setCurrentOwner(val);
	}

    return(
        <div>
            <h3>Connect to MetaMask</h3>
            <button onClick={connectWalletHandler }>{connButtonText}</button>
            <h3>Address: {defaultAccount}</h3>
			<div className='content'>
				<h3>Visit as:</h3>
				<ul className='menu'>
					<li>
						<NavLink to="/admin">Admin</NavLink>
					</li>
					<li>
					<NavLink to="/farmer">Farmer</NavLink>
					</li>
				</ul>
				<hr/>
			</div>
            <form onSubmit={addFarmer}>
				<input id="addFarmer" type="text"/>
				<button type={"submit"}> Add Farmer </button>
			</form>
            <button onClick={getCurrentOwner}> Get Current Contract Owner </button>
            {currentOwner}
            {errorMessage}
        </div>
    )
}

export default Home