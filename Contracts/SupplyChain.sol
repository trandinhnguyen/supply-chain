// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Structure.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable{
    //product code
    uint256 public uid;
    uint256 private sku;

    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;
    mapping(address => Structure.Roles) roles;

    constructor() payable{
        sku = 1;
        uid = 1;
    }

    //============= ADD ROLES =====================
    event FarmerAdded(address indexed _account);

    function hasFarmerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Farmer;
    }

    function addFarmerRole(address _account) public {
        require(_account != address(0));
        require(!hasFarmerRole(_account));

        roles[_account].Farmer = true;
        emit FarmerAdded(_account);
    }

    //============================================

    //=============== MODIFIER ===================

    event ProducedByFarmer(uint256 uid);

    modifier producedByFarmer(uint256 _uid) {
        require(products[_uid].productState == Structure.State.ProducedByFarmer);
        _;
    }

    modifier shippedByFarmer(uint256 _uid) {
        require(products[_uid].productState == Structure.State.ShippedByFarmer);
        _;
    }

    //============================================

    //=============== CHAIN FUNCTION ===================

    function initEmptyProductInfo(Structure.Product memory product) internal pure{
        address distributor;
        address retailer;
        address customer;
        string memory transaction;

        product.distributor.distributor = distributor;
        product.retailer.retailer = retailer;
        product.customer.customer = customer;
        product.transaction = transaction;
    }

    function setProductDetailInfo(
        Structure.Product memory product,
        string memory productName,
        uint256 productCode,
        uint256 productPrice
    ) internal pure{
        product.productDetail.productName=productName;
        product.productDetail.productCode=productCode;
        product.productDetail.productPrice=productPrice;
    }

    ///@dev STEP 1 : Produced a product.
    function produceProduct(
        string memory farmerName,
        string memory farmerAddress,
        string memory productName,
        uint256 productPrice,
        uint256 productCode
    ) public{
        require(hasFarmerRole(msg.sender));
        Structure.Product memory product;
        product.sku=sku;
        product.uid=uid;
        product.owner=msg.sender;
        product.farmer.farmer=msg.sender;
        product.farmer.farmerName=farmerName;
        product.farmer.farmerAddress=farmerAddress;
        
        initEmptyProductInfo(product);
        setProductDetailInfo(product, productName,productPrice,productCode);

        product.productState=Structure.State.ProducedByFarmer;
        products[uid] = product;
        productHistory[uid].history.push(product);

        sku++;
        uid++;

        emit ProducedByFarmer(uid-1);
    }
}