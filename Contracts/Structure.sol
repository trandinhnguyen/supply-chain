// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

library Structure{
    enum State{
        ProducedByFarmer,
        PurchaseByDistributor,
        ShippedByFarmer
    }

    struct FarmerDetail{
        address farmer;
        string farmerName;
        string farmerAddress;
    }

    struct DistributorDetail{
        address distributor;
    }

    struct RetailerDetail{
        address retailer;
    }

    struct CustomerDetail{
        address customer;
    }

    struct ProductDetail{
        string productName;
        uint256 productCode;
        uint256 productPrice;
    }

    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ProductDetail productDetail;
        FarmerDetail farmer;
        DistributorDetail distributor;
        RetailerDetail retailer;
        CustomerDetail customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct Roles {
        bool Farmer;
        bool Distributor;
        bool Retailer;
        bool Customer;
    }
}