// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract Farmer is Ownable {
    using Roles for Roles.Role;

    event FarmerAdded(address indexed account);
    event FarmerRemoved(address indexed account);

    Roles.Role private farmers;

    modifier onlyFarmer() {
        require(isFarmer(msg.sender));
        _;
    }

    function isFarmer(address account) public view returns (bool) {
        return farmers.hasRole(account);
    }

    function _addFarmer(
        address account,
        string memory name,
        string memory realAddress
    ) internal {
        farmers.addRole(account, name, realAddress);
        emit FarmerAdded(account);
    }

    function _removeFarmer(address account) internal {
        farmers.removeRole(account);
        emit FarmerRemoved(account);
    }

    function _changeFarmerName(address account, string memory name) internal {
        farmers.changeName(account, name);
    }

    function _changeFarmerRealAddress(
        address account,
        string memory realAddress
    ) internal {
        farmers.changeRealAddress(account, realAddress);
    }

    function addFarmer(
        address account,
        string memory name,
        string memory realAddress
    ) public onlyOwner {
        _addFarmer(account, name, realAddress);
    }

    function renounceFarmer() public {
        _removeFarmer(msg.sender);
    }

    function changeFarmerName(string memory name) public {
        _changeFarmerName(msg.sender, name);
    }

    function changeFarmerRealAddress(string memory realAddress) public {
        _changeFarmerRealAddress(msg.sender, realAddress);
    }

    function getFarmerInfo(address account)
        public
        view
        returns (string memory name, string memory realAddress)
    {
        require(isFarmer(account));
        return farmers.getInfo(account);
    }

    function addFarmerProduct(uint256 uid) internal {
        farmers.addProduct(msg.sender, uid);
    }

    function getAllFarmerProduct() public view returns (uint256[] memory) {
        return farmers.getAllProduct(msg.sender);
    }

    function getFarmerProductCount() public view returns (uint256) {
        return farmers.getProductCount(msg.sender);
    }
}
