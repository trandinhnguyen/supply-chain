import abi from "./SupplyChain.json";

export const contractABI = abi.abi;

export const contractAddress = "0xF9714128E29D65C3bf5AeD5eD87cdeB4ace390B1";

export const productState = {
  ProducedByFarmer: 0,
  PurchasedByDistributor: 1,
  ShippedByFarmer: 2,
  ReceivedByDistributor: 3,
  PurchasedByRetailer: 4,
  ShippedByDistributor: 5,
  ReceivedByRetailer: 6,
  PurchasedByCustomer: 7,
  ShippedByRetailer: 8,
  ReceivedByCustomer: 9,
};

export const stateToString = [
  'ProducedByFarmer',
  'PurchasedByDistributor',
  'ShippedByFarmer',
  'ReceivedByDistributor',
  'PurchasedByRetailer',
  'ShippedByDistributor',
  'ReceivedByRetailer',
  'PurchasedByCustomer',
  'ShippedByRetailer',
  'ReceivedByCustomer',
]


export const noneFilter = (value) => {
  if(value == 0)
    return 'None';
  return value;
}
