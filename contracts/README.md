# WicketPass contracts

Hardhat project for the three WicketPass contracts: **TicketNFT**, **FanPassport** and **Marketplace**.
See the [main README](../README.md) for what each one enforces.

```bash
npm install
npx hardhat compile
npx hardhat test
```

Deploying needs a `.env` (see `.env.example`) with `PRIVATE_KEY` and `WIREFLUID_RPC_URL`:

```bash
npx hardhat run scripts/deployTicketNFT.js --network wirefluid
npx hardhat run scripts/deployFanPassport.js --network wirefluid
npx hardhat run scripts/deployMarketplace.js --network wirefluid
```

Deployed addresses are in `deployments/addresses.json` and [../docs/deployments.md](../docs/deployments.md).
