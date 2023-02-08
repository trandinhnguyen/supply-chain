// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../Structure.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract Retailer is Ownable {
    using Roles for Roles.Role;

    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    Roles.Role private retailers;
    mapping(address => Structure.PersonDetail) private details;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }

    function isRetailer(address account) public view returns (bool) {
        return retailers.hasRole(account);
    }

    function _addRetailer(
        address account,
        string memory name,
        string memory realAddress
    ) internal {
        retailers.addRole(account);
        details[account].name = name;
        details[account].realAddress = realAddress;
        emit RetailerAdded(account);
    }

    function _removeRetailer(address account) internal {
        retailers.removeRole(account);
        emit RetailerRemoved(account);
    }

    function _changeRetailerName(address account, string memory name) internal {
        details[account].name = name;
    }

    function _changeRetailerRealAddress(
        address account,
        string memory realAddress
    ) internal {
        details[account].realAddress = realAddress;
    }

    function addRetailer(
        address account,
        string memory name,
        string memory realAddress
    ) public onlyOwner {
        _addRetailer(account, name, realAddress);
    }

    function renounceRetailer() public onlyRetailer {
        _removeRetailer(msg.sender);
    }

    function changeRetailerName(string memory name) public {
        _changeRetailerName(msg.sender, name);
    }

    function changeRetailerRealAddress(string memory realAddress) public {
        _changeRetailerRealAddress(msg.sender, realAddress);
    }

    function getRetailerInfo(address account)
        public
        view
        returns (string memory name, string memory realAddress)
    {
        require(isRetailer(account));
        return (details[account].name, details[account].realAddress);
    }

    function addRetailerProduct(uint256 uid) internal {
        details[msg.sender].products.push(uid);
    }

    function getAllRetailerProduct(address account)
        public
        view
        returns (uint256[] memory)
    {
        require(isRetailer(account));
        return details[account].products;
    }

    function getRetailerProductCount() public view returns (uint256) {
        return details[msg.sender].products.length;
    }
}
