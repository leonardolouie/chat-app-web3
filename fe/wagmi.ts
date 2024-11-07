import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

const localChain: Chain = {
  id: 31337, //hardhat node chain
  name: "localhost:8545",
  nativeCurrency: {
    name: "Local ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
  testnet: true,
};

const sepoliaRPCURL =
  "https://eth-sepolia.g.alchemy.com/v2/ccrHCNXEx-Qm4gwOmUxtKNpBDvNU38yJ";

const sepoliaChain: Chain = {
  id: 11_155_111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [sepoliaRPCURL],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api",
    },
  },

  testnet: true,
};

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepoliaChain, localChain, mainnet],
  ssr: true,
});
