import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";

function App() {
  const [account, setAccount] = useState(null);
  const [nfts, setNfts] = useState([]);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  }

  async function mintNFT() {
    if (!account) return alert("Connect wallet first");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.mintPatient("ipfs://QmDemoCID/metadata.json");
      await tx.wait();

      alert("✅ NFT minted successfully!");
      await getMyNFTs();
    } catch (err) {
      console.error(err);
      alert("❌ Minting failed");
    }
  }

  async function getMyNFTs() {
    if (!account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    const nextId = await contract.nextTokenId();
    const myNFTs = [];

    for (let i = 1; i < nextId; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === account.toLowerCase()) {
          const uri = await contract.tokenURI(i);
          const consent = await contract.isAllowed(i);
          myNFTs.push({ tokenId: i, uri, consent });
        }
      } catch {}
    }
    setNfts(myNFTs);
  }

  async function setConsent(tokenId, allow) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    const tx = await contract.setAllowTraining(tokenId, allow);
    await tx.wait();

    alert(`Consent updated for Token ${tokenId}`);
    await getMyNFTs();
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Federated Patient NFT Portal</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <div>
          <p>Connected as: {account}</p>
          <button onClick={mintNFT}>Mint My Patient NFT</button>
          <button onClick={getMyNFTs}>Show My NFTs</button>

          <h3>My NFTs</h3>
          {nfts.map(nft => (
            <div key={nft.tokenId}>
              <p>ID: {nft.tokenId} | URI: {nft.uri}</p>
              <p>Consent: {nft.consent ? "✅ Allowed" : "❌ Not Allowed"}</p>
              <button onClick={() => setConsent(nft.tokenId, true)}>Allow</button>
              <button onClick={() => setConsent(nft.tokenId, false)}>Disallow</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
