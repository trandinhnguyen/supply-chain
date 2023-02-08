import abi from "../artifacts/SupplyChain.json";

export const contractABI = abi.abi;

export const contractAddress = "0x664aCa0a2e99cCb09B33880c4c1A1A3dd98D8937";


export const productState = {
    ProducedByFarmer:0,
    PurchasedByDistributor:1,
    ShippedByFarmer:2,
    ReceivedByDistributor:3,
    PurchasedByRetailer:4,
    ShippedByDistributor:5,
    ReceivedByRetailer:6,
    PurchasedByCustomer:7,
    ShippedByRetailer:8,
    ReceivedByCustomer:9
};

