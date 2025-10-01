import { ethers } from "ethers";
import abi from "./PatientNFT.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // paste from deploy.js

export function getContract(signerOrProvider) {
  return new ethers.Contract(contractAddress, abi.abi, signerOrProvider);
}
