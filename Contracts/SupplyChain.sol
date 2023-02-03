// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Structure.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./accesscontrol/Distributor.sol";
import "./accesscontrol/Retailer.sol";

contract SupplyChain is Ownable, Distributor, Retailer {
    //product code
    uint256 public uid;
    uint256 private sku;

    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;
    mapping(address => Structure.Roles) roles;

    constructor() payable {
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

    event CustomerAdded(address indexed _account);

    function hasCustomerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Customer;
    }

    function addCustomerRole(address _account) public {
        require(_account != address(0));
        require(!hasCustomerRole(_account));

        roles[_account].Farmer = true;
        emit CustomerAdded(_account);
    }

    // =============== EVENT ===============
    event ProducedByFarmer(uint256 uid);
    event PurchasedByDistributor(uint256 uid);
    event ShippedByFarmer(uint256 uid);
    event ReceivedByDistributor(uint256 uid);
    event PurchasedByRetailer(uint256 uid);
    event ShippedByDistributor(uint256 uid);
    event ReceivedByRetailer(uint256 uid);
    event ShippedByRetailer(uint256 uid);
    event ReceivedByCustomer(uint256 uid);
    
    //============================================

    //=============== MODIFIER ===================

    modifier producedByFarmer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ProducedByFarmer
        );
        _;
    }

    modifier purchasedByDistributor(uint256 _uid) {
        require(
            products[_uid].productState ==
                Structure.State.PurchasedByDistributor
        );
        _;
    }

    modifier shippedByFarmer(uint256 _uid) {
        require(products[_uid].productState == Structure.State.ShippedByFarmer);
        _;
    }

    modifier receivedByDistributor(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByDistributor
        );
        _;
    }

    modifier purchasedByRetailer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByRetailer
        );
        _;
    }

    modifier shippedByDistributor(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByDistributor
        );
        _;
    }

    modifier receivedByRetailer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByRetailer
        );
        _;
    }

    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByCustomer
        );
        _;
    }

    modifier shippedByRetailer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByRetailer
        );
        _;
    }

    //============================================

    //=============== CHAIN FUNCTION ===================

    function initEmptyProductInfo(Structure.Product memory product)
        internal
        pure
    {
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
    ) internal pure {
        product.productDetail.productName = productName;
        product.productDetail.productCode = productCode;
        product.productDetail.productPrice = productPrice;
    }

    ///@dev STEP 1 : Produced a product.
    function produceProduct(
        string memory farmerName,
        string memory farmerAddress,
        string memory productName,
        uint256 productPrice,
        uint256 productCode
    ) public {
        require(hasFarmerRole(msg.sender));
        Structure.Product memory product;
        product.sku = sku;
        product.uid = uid;
        product.owner = msg.sender;
        product.farmer.farmer = msg.sender;
        product.farmer.farmerName = farmerName;
        product.farmer.farmerAddress = farmerAddress;

        initEmptyProductInfo(product);
        setProductDetailInfo(product, productName, productPrice, productCode);

        product.productState = Structure.State.ProducedByFarmer;
        products[uid] = product;
        productHistory[uid].history.push(product);

        sku++;
        uid++;

        emit ProducedByFarmer(uid - 1);
    }

    /// @dev STEP 2: Distributor purchases the product of Farmer.
    function purchaseByDistributor(uint256 _uid)
        public
        onlyDistributor
        producedByFarmer(_uid)
    {
        products[_uid].distributor.distributor = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByDistributor(_uid);
    }

    /// @dev STEP 3: Farmer ships the product to Distributor

    /// @dev STEP 4: Distributor receives the product shipped by Farmer.
    function receiveByDistributor(uint256 _uid)
        public
        onlyDistributor
        shippedByFarmer(_uid)
    {
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByDistributor(_uid);
    }

    /// @dev STEP 5: Retailer purchases the product of Distributor
    function purchaseByRetailer(uint256 _uid)
        public
        onlyRetailer
        receivedByDistributor(_uid)
    {
        products[_uid].retailer.retailer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByRetailer;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByRetailer(_uid);
    }

    /// @dev STEP 6: Distributor ships the product to Retailer
    function shipByDistributor(uint256 _uid)
        public
        onlyDistributor
        purchasedByRetailer(_uid)
    {
        products[_uid].productState = Structure.State.ShippedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByDistributor(_uid);
    }

    /// @dev STEP 7: Retailer receives the product shipped by Distributor
    function receiveByRetailer(uint256 _uid)
        public
        onlyRetailer
        shippedByDistributor(_uid)
    {
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByRetailer;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByRetailer(_uid);
    }

    /// @dev STEP 8: Customer purchases the product of Retailer

    /// @dev STEP 9: Retailer ships the product to Customer
    function shipByRetailer(uint256 _uid)
        public
        onlyRetailer
        purchasedByCustomer(_uid)
    {
        products[_uid].productState = Structure.State.ShippedByRetailer;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByRetailer(_uid);
    }
}
