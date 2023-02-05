// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract Retailer is Ownable {
    using Roles for Roles.Role;

    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    Roles.Role private retailers;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }

    function isRetailer(address account) public view returns (bool) {
        return retailers.hasRole(account);
    }

    function _addRetailer(address account) internal {
        retailers.addRole(account);
        emit RetailerAdded(account);
    }

    function _removeRetailer(address account) internal {
        retailers.removeRole(account);
        emit RetailerRemoved(account);
    }

    function addRetailer(address account) public onlyOwner {
        _addRetailer(account);
    }

    function renounceRetailer() public {
        _removeRetailer(msg.sender);
    }
}
