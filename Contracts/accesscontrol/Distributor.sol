// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../Structure.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract Distributor is Ownable {
    using Roles for Roles.Role;

    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private distributors;
    mapping(address => Structure.PersonDetail) private details;

    modifier onlyDistributor() {
        require(isDistributor(msg.sender));
        _;
    }

    function isDistributor(address account) public view returns (bool) {
        return distributors.hasRole(account);
    }

    function _addDistributor(
        address account,
        string memory name,
        string memory realAddress
    ) internal {
        distributors.addRole(account);
        details[account].name = name;
        details[account].realAddress = realAddress;
        emit DistributorAdded(account);
    }

    function _removeDistributor(address account) internal {
        distributors.removeRole(account);
        emit DistributorRemoved(account);
    }

    function _changeDistributorName(address account, string memory name)
        internal
    {
        details[account].name = name;
    }

    function _changeDistributorRealAddress(
        address account,
        string memory realAddress
    ) internal {
        details[account].realAddress = realAddress;
    }

    function addDistributor(
        address account,
        string memory name,
        string memory realAddress
    ) public onlyOwner {
        _addDistributor(account, name, realAddress);
    }

    function renounceDistributor() public onlyDistributor {
        _removeDistributor(msg.sender);
    }

    function changeDistributorName(string memory name) public {
        _changeDistributorName(msg.sender, name);
    }

    function changeDistributorRealAddress(string memory realAddress) public {
        _changeDistributorRealAddress(msg.sender, realAddress);
    }

    function getDistributorInfo(address account)
        public
        view
        returns (string memory name, string memory realAddress)
    {
        require(isDistributor(account));
        return (details[account].name, details[account].realAddress);
    }

    function addDistributorProduct(uint256 uid) internal {
        details[msg.sender].products.push(uid);
    }

    function getAllDistributorProduct() public view returns (uint256[] memory) {
        return details[msg.sender].products;
    }

    function getDistributorProductCount() public view returns (uint256) {
        return details[msg.sender].products.length;
    }
}
