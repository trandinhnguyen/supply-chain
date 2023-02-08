import abi from "./SupplyChain.json";

export const contractABI = abi.abi;

export const contractAddress = "0x0f7DBa91787e786FE0443e5407c023eD7858fb08";


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

