import abi from "../artifacts/SupplyChain.json";

export const contractABI = abi.abi;

export const contractAddress = "0x1e4AB2E0c0bDCFce54a0954cb79CdC795Fd67F5f";


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

