// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract Distributor is Ownable {
    using Roles for Roles.Role;

    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private distributors;

    modifier onlyDistributor() {
        require(isDistributor(msg.sender));
        _;
    }

    function isDistributor(address account) public view returns (bool) {
        return distributors.hasRole(account);
    }

    function _addDistributor(address account) internal {
        distributors.addRole(account);
        emit DistributorAdded(account);
    }

    function _removeDistributor(address account) internal {
        distributors.removeRole(account);
        emit DistributorRemoved(account);
    }

    function addDistributor(address account) public onlyOwner {
        _addDistributor(account);
    }

    function renounceDistributor() public {
        _removeDistributor(msg.sender);
    }
}
