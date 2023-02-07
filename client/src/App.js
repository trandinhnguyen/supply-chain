import Home from "./components/Home";
import Admin from "./components/Admin";
import Farmer from "./components/Farmer";
import Customer from "./components/Customer";
import {Route, NavLink, Routes} from 'react-router-dom';
import React, { Component } from "react";
import {ethers} from  "ethers";
import { contractABI, contractAddress } from "./utils/constants";
import ProductHistory from "./components/ProductHistory";
import { Distributor } from "./components/Distributor";

class App extends Component {
  state = {
    errorMessage: null,
    defaultAccount: null,
    contract: null,
    connButtonText: null,
    currentOwner: null,
    provider: null,
    signer: null,
  };

  componentDidMount = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          this.accountChangedHandler(result[0]);
          this.setState({ connButtonText: "Wallet Connected" });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    } else {
      this.setState({ errorMessage: "Need to install Metamask" });
    }
  };

  accountChangedHandler = (newAccount) => {
    this.setState({ defaultAccount: newAccount });
    this.updateEthers();
  };

  updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner);
		
    this.setState({provider:tempProvider, signer:tempSigner, contract: tempContract})
	}

  getCurrentOwner = async () => {
    let val = await this.state.contract.owner();
    this.setState({ currentOwner: val });
  };

  render() {
    return (
      <div className="App">
        <div>
          <nav>
            <NavLink to="/">Home</NavLink>
          </nav>
          <button onClick={this.getCurrentOwner}>
            {" "}
            Get Current Contract Owner{" "}
          </button>
          {this.state.currentOwner}
          <div>
            <h3>Connect to Metamask</h3>
            <button onClick={this.connectWalletHandler}>
              {this.state.connButtonText}
            </button>
            <h3>Address: {this.state.defaultAccount}</h3>
          </div>
          <Routes>
            <Route exact path='/admin' element={<Admin account={this.state.defaultAccount} contract={this.state.contract} owner={this.state.currentOwner}/>} />
            <Route exact path='/farmer' element={<Farmer account={this.state.defaultAccount} contract={this.state.contract} owner={this.state.currentOwner}/>} />
            <Route exact path='/customer' element={<Customer account={this.state.defaultAccount} contract={this.state.contract} owner={this.state.currentOwner}/>} />
            <Route exact path='/product-history' element={<ProductHistory account={this.state.defaultAccount} contract={this.state.contract} owner={this.state.currentOwner}/>} />
            <Route exact path='/' element={<Home />} />
            <Route
              exact
              path="/distributor"
              element={
                <Distributor
                  account={this.state.defaultAccount}
                  contract={this.state.contract}
                  owner={this.state.currentOwner}
                />
              }
            />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
