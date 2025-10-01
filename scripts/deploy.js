async function main() {
  const [deployer] = await ethers.getSigners();
  const PatientNFT = await ethers.getContractFactory("PatientNFT");
  const nft = await PatientNFT.deploy(deployer.address); // pass deployer as initialOwner
  await nft.deployed();
  console.log("PatientNFT deployed to:", nft.address);
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
