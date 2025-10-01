// scripts/mintSample.js
const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";// paste deployed contract

  // ✅ this avoids ENS resolution issues
  const nft = await hre.ethers.getContractAt("PatientNFT", contractAddress, signer);

  console.log("Minting from:", signer.address);

  const tx = await nft.mintPatient("ipfs://QmDemoCID/metadata.json");
  const receipt = await tx.wait();

  console.log("Mint tx hash:", receipt.hash);

  const nextId = await nft.nextTokenId();
  const mintedId = BigInt(nextId) - 1n;
  console.log("Minted tokenId:", mintedId.toString());
}

main().catch(console.error);
