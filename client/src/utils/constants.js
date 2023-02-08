import abi from "./SupplyChain.json";

export const contractABI = abi.abi;

export const contractAddress = "0xbb51b5B75A264571F7A8b03C4458434cb07364a9";


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

