# Learn Web3 NFT Project with Hardhat

This project demonstrates how to build and deploy a basic project using Solidity and Hardhat.

## Prerequisites

Make sure you have the following installed:

- Node.js
- Hardhat - Framework for smart contract development.
- Infura - Ethereum blockchain node provider.
- MetaMask - Web3 wallet for interacting with Ethereum.

### Start Truffle Development Console with Ganache

To open the Hardhat development console and spin up a local blockchain using ganache, run the following command:

```bash
npx hardhat node
```

### Compile the Contracts

Once the console is open, you can compile your contracts by running `npx hardhat ignition deploy ignition file --network <network>`:

```bash
npx hardhat ignition deploy ./ignition/modules/SpaceBear.js --network localhost
```

## Running Tests

To run the tests for your contracts, you can use the following command in the Truffle console or your terminal:

```bash
npx hardhat test
```

## Deploy your contract and verify it in to the Test Network or Mainnet using Infura

To deploy your contract, ensure you have your .infura and .secrets files set up with your Infura Project ID and seed phrase, then `npx hardhat ignition deploy ignition file --network <network>` in your terminal Create an account on [https://app.infura.io/](https://app.infura.io/) if you haven't already.

```bash
npx hardhat ignition deploy ./ignition/modules/SpaceBear.js --network sepolia --verify
```

## Forking a network outside local machine using Ganache and Infura

To fork a network for validating or debugging something outside the local network, simply run: `npx hardhat node --fork https://mainnet.infura.io/v3/<key>` Replace <network> with the desired network you want to fork (e.g., mainnet or a testnet).:

```bash
npx hardhat node --fork https://mainnet.infura.io/v3/<key>
```
