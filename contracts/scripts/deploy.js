// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const PatientNFT = await ethers.getContractFactory("PatientNFT");
  const nft = await PatientNFT.deploy(deployer.address);

  console.log("PatientNFT deployed to:", nft.target); // ✅ correct for ethers v6
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
