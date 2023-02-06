// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/// @title Roles
/// @dev Library for managing addresses assigned to a Role.
library Roles {
    struct Role {
        mapping(address => bool) isRole;
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
    function addRole(Role storage role, address account) internal {
        require(account != address(0));
        require(!hasRole(role, account));

        role.isRole[account] = true;
    }

    /// @dev remove an account's access to this role
    function removeRole(Role storage role, address account) internal {
        require(hasRole(role, account));

        role.isRole[account] = false;
    }
}
