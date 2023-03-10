// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../Structure.sol";

// Define a contract 'CustomerRole' to manage this role - add, remove, check
contract Customer is Ownable {
    using Roles for Roles.Role;

    event CustomerAdded(address indexed account);
    event CustomerRemoved(address indexed account);

    Roles.Role private customers;
    mapping(address => Structure.PersonDetail) private details;

    modifier onlyCustomer() {
        require(isCustomer(msg.sender));
        _;
    }

    function isCustomer(address account) public view returns (bool) {
        return customers.hasRole(account);
    }

    function _addCustomer(
        address account,
        string memory name,
        string memory realAddress
    ) internal {
        customers.addRole(account);
        details[account].name = name;
        details[account].realAddress = realAddress;
        emit CustomerAdded(account);
    }

    function _removeCustomer(address account) internal {
        customers.removeRole(account);
        emit CustomerRemoved(account);
    }

    function addCustomer(
        address account,
        string memory name,
        string memory realAddress
    ) public onlyOwner {
        _addCustomer(account, name, realAddress);
    }

    function renounceCustomer() public onlyCustomer {
        _removeCustomer(msg.sender);
    }

    function addCustomerProduct(uint256 uid) internal {
        details[msg.sender].products.push(uid);
    }

    function getAllCustomerProduct(address account) public view returns (uint256[] memory) {
        require(isCustomer(account));
        return details[account].products;
    }

    function getCustomerProductCount() public view returns (uint256) {
        return details[msg.sender].products.length;
    }
}
