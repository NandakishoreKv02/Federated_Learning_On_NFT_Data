// scripts/toggleConsent.js
const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  // ⚠️ Replace with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const nft = await hre.ethers.getContractAt("PatientNFT", contractAddress, signer);

  // The tokenId to toggle (e.g. tokenId = 1 if you minted one already)
  const tokenId = 1;

  console.log(`Toggling consent for token ${tokenId} by`, signer.address);

  // Flip consent → true
  let tx = await nft.setAllowTraining(tokenId, true);
  await tx.wait();
  console.log("✅ Consent set to TRUE");

  // Read consent back
  let consent = await nft.isAllowed(tokenId);
  console.log("Consent status:", consent);

  // Flip consent → false
  tx = await nft.setAllowTraining(tokenId, false);
  await tx.wait();
  console.log("✅ Consent set to FALSE");

  // Read consent again
  consent = await nft.isAllowed(tokenId);
  console.log("Consent status:", consent);
}

main().catch(console.error);
