// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

library Structure {
    enum State {
        ProducedByFarmer,
        PurchasedByDistributor,
        ShippedByFarmer,
        ReceivedByDistributor,
        PurchasedByRetailer,
        ShippedByDistributor,
        ReceivedByRetailer,
        PurchasedByCustomer,
        ShippedByRetailer,
        ReceivedByCustomer
    }

    struct ProductDetail {
        string productName;
        uint256 productCode;
        uint256 productPrice;
    }

    struct PersonDetail {
        string name;
        string realAddress;
        uint256[] products;
    }

    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ProductDetail productDetail;
        address farmer;
        address distributor;
        address retailer;
        address customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }
}
