// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/// @title Roles
/// @dev Library for managing addresses assigned to a Role.
library Roles {
    struct Role {
        mapping(address => bool) isRole;
        mapping(address => string) name;
        mapping(address => string) realAddress;
        mapping(address => uint256[]) products;
    }

    /// @dev check if an account has this role
    function hasRole(Role storage role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0));
        return role.isRole[account];
    }

    /// @dev give an account access to this role
    function addRole(
        Role storage role,
        address account,
        string memory name,
        string memory realAddress
    ) internal {
        require(account != address(0));
        require(!hasRole(role, account));

        role.isRole[account] = true;
        role.name[account] = name;
        role.realAddress[account] = realAddress;
    }

    /// @dev remove an account's access to this role
    function removeRole(Role storage role, address account) internal {
        require(hasRole(role, account));

        role.isRole[account] = false;
    }

    function changeName(
        Role storage role,
        address account,
        string memory name
    ) internal {
        require(hasRole(role, account));

        role.name[account] = name;
    }

    function changeRealAddress(
        Role storage role,
        address account,
        string memory realAddress
    ) internal {
        require(hasRole(role, account));

        role.realAddress[account] = realAddress;
    }

    function getInfo(Role storage role, address account)
        internal
        view
        returns (string memory name, string memory realAddress)
    {
        return (role.name[account], role.realAddress[account]);
    }

    function addProduct(
        Role storage role,
        address account,
        uint256 uid
    ) internal {
        require(hasRole(role, account));

        role.products[account].push(uid);
    }

    function getAllProduct(Role storage role, address account)
        internal
        view
        returns (uint256[] memory)
    {
        require(hasRole(role, account));
        require(role.products[account].length > 0);

        return role.products[account];
    }

    function getProductCount(Role storage role, address account)
        internal
        view
        returns (uint256)
    {
        require(hasRole(role, account));
        return role.products[account].length;
    }
}
