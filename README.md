# Federated NFT Patient

This project is a federated learning platform using NFT data, with a backend, smart contracts, and a React frontend.

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Hardhat (for smart contract development)
- Python (for federated learning server/clients)

## Project Structure
- `contracts/` — Solidity smart contracts (Hardhat)
- `backend/` — Backend server (Node.js/Express or Python)
- `frontend/` — React frontend (Vite)
- `fl_server/` and `fl_clients/` — Federated learning server and clients (Python)

## Setup Instructions

### 1. Clone the repository
```powershell
git clone https://github.com/NandakishoreKv02/Federated_Learning_On_NFT_Data.git
cd Federated_Learning_On_NFT_Data/federated-nft-patient
```

### 2. Install dependencies
#### Contracts
```powershell
cd contracts
npm install
```
#### Frontend
```powershell
cd ../frontend
npm install
```
#### Backend (if Node.js)
```powershell
cd ../backend
npm install
```

### 3. Compile and deploy smart contracts
```powershell
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Start the local blockchain (optional)
```powershell
npx hardhat node
```

### 5. Run the frontend
```powershell
cd ../frontend
npm run dev
```

### 6. Run the backend (if Node.js)
```powershell
cd ../backend
npm start
```

### 7. Federated Learning (Python)
- Start the server:
  ```powershell
  cd ../fl_server
  python server.py
  ```
- Start clients:
  ```powershell
  cd ../fl_clients
  python client.py
  ```

## Environment Variables
- Create `.env` files in `contracts/`, `frontend/`, and `backend/` as needed for secrets and configuration.

## Notes
- Make sure to update contract addresses in the frontend after deployment.
- For development, use Hardhat's local blockchain. For production, configure for testnet/mainnet.

## Troubleshooting
- If you encounter issues, check that all dependencies are installed and the correct Node/Python versions are used.
- For smart contract errors, check Hardhat output and contract addresses.

## License
MIT
