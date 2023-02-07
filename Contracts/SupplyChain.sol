// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Structure.sol";
import "./accesscontrol/Farmer.sol";
import "./accesscontrol/Distributor.sol";
import "./accesscontrol/Retailer.sol";
import "./accesscontrol/Customer.sol";

contract SupplyChain is Farmer, Distributor, Retailer, Customer {
    //product code
    uint256 public uid;
    uint256 private sku;

    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;

    constructor() payable {
        sku = 1;
        uid = 1;
    }

    // =============== EVENT ===============
    event ProducedByFarmer(uint256 uid);
    event PurchasedByDistributor(uint256 uid);
    event ShippedByFarmer(uint256 uid);
    event ReceivedByDistributor(uint256 uid);
    event PurchasedByRetailer(uint256 uid);
    event ShippedByDistributor(uint256 uid);
    event ReceivedByRetailer(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
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

    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByCustomer
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

        product.distributor = distributor;
        product.retailer = retailer;
        product.customer = customer;
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

    ///@dev STEP 1: Farmer produces a product.
    function produceProduct(
        string memory productName,
        uint256 productPrice,
        uint256 productCode
    ) public onlyFarmer {
        Structure.Product memory product;
        product.sku = sku;
        product.uid = uid;
        product.owner = msg.sender;
        product.farmer = msg.sender;

        initEmptyProductInfo(product);
        setProductDetailInfo(product, productName, productPrice, productCode);
        addFarmerProduct(uid);

        product.productState = Structure.State.ProducedByFarmer;
        products[uid] = product;
        productHistory[uid].history.push(product);

        emit ProducedByFarmer(uid);

        sku++;
        uid++;
    }

    /// @dev STEP 2: Distributor purchases the product of Farmer.
    function purchaseByDistributor(uint256 _uid)
        public
        onlyDistributor
        producedByFarmer(_uid)
    {
        products[_uid].distributor = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByDistributor;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByDistributor(_uid);
    }

    /// @dev STEP 3: Farmer ships the product to Distributor
    function shipByFarmer(uint256 _uid)
        public
        onlyFarmer
        purchasedByDistributor(_uid)
    {
        products[_uid].productState = Structure.State.ShippedByFarmer;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByFarmer(_uid);
    }
    
    /// @dev STEP 4: Distributor receives the product shipped by Farmer.
    function receiveByDistributor(uint256 _uid)
        public
        onlyDistributor
        shippedByFarmer(_uid)
    {
        products[_uid].owner = msg.sender;
        addDistributorProduct(_uid);

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
        products[_uid].retailer = msg.sender;
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
        addRetailerProduct(_uid);

        products[_uid].productState = Structure.State.ReceivedByRetailer;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByRetailer(_uid);
    }

    /// @dev STEP 8: Customer purchases the product of Retailer
    function purchaseByCustomer(uint256 _uid)
        public
        onlyCustomer
        receivedByRetailer(_uid)
    {
        products[_uid].customer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByCustomer;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByCustomer(_uid);
    }

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

    /// @dev STEP 10: Customer receives the product.
    function receiveByCustomer(uint256 _uid)
        public
        onlyCustomer
        shippedByRetailer(_uid)
    {
        products[_uid].owner = msg.sender;
        addCustomerProduct(_uid);

        products[_uid].productState = Structure.State.ReceivedByCustomer;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByCustomer(_uid);
    }

    // ==================== FUNCTIONALITY =======================
    function getProductDetail(uint256 _uid)
        public
        view
        returns (
            uint256 productUid,
            uint256 productSku,
            address productOwner,
            Structure.State productState,
            string memory productName,
            uint256 productPrice,
            uint256 productCode,
            address farmer,
            address distributor,
            address retailer,
            address customer,
            string memory transaction
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product memory product = products[_uid];
        return (
            product.uid,
            product.sku,
            product.owner,
            product.productState,
            product.productDetail.productName,
            product.productDetail.productPrice,
            product.productDetail.productCode,
            product.farmer,
            product.distributor,
            product.retailer,
            product.customer,
            product.transaction
        );
    }

    function getProductHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        require(products[_uid].uid != 0);
        return productHistory[_uid].history.length;
    }

    function getProductHistory(uint256 _uid, uint256 i)
        public
        view
        returns (
            address productOwner,
            Structure.State productState,
            address farmer,
            address distributor,
            address retailer,
            address customer,
            string memory transaction
        )
    {
        require(products[_uid].uid != 0);
        require(i < getProductHistoryLength(_uid));

        Structure.Product memory product = productHistory[_uid].history[i];

        return (
            product.owner,
            product.productState,
            product.farmer,
            product.distributor,
            product.retailer,
            product.customer,
            product.transaction
        );
    }

    function getAllProductByState(Structure.State state_)
        public
        view 
        returns (uint256[] memory) {
            uint256[] memory result = new uint256[](uid);
            uint j = 0;
            for(uint i = 1; i < uid; i++)
            {
                require(products[i].productState == state_);
                result[j] = i;
                j++;
            }
            return result;
        }
}
