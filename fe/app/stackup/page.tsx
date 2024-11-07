"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChatBox from "../components/ChatBox";
import { ChangeEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEthersProvider } from "../lib/ethers";

const rpcUrl = "https://public.stackup.sh/api/v1/node/ethereum-sepolia";
const paymasterUrl = ""; // Optional - you can get one at https://app.stackup.sh/

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<`0x${string}`>();
  const [useSmartWallet, setUseSmartWallet] = useState<boolean>(false);
  const { address } = useAccount();

  const signer = useEthersProvider();

  useEffect(() => {
    console.log("useSmartWallet", useSmartWallet);

    if (useSmartWallet && signer) {
    } else {
      setConnectedAddress(address);
    }
  }, [useSmartWallet]);
  const handleOnChangeSmartWallet = () => {
    setUseSmartWallet(!useSmartWallet);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-8">
        <div>
          <ConnectButton />
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useSmartWallet}
            onChange={() => handleOnChangeSmartWallet()}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Smart Wallet
          </span>
        </label>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatBox />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Chatter App using ERC43337
      </footer>
    </div>
  );
}
