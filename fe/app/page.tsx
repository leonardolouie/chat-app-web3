"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useWatchContractEvent,
} from "wagmi";
import { Log } from "viem";

const chatterJson = require("../../chatter-contracts/artifacts/contracts/Chatter.sol/Chatter.json");
const chatterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const { data: hash, writeContract } = useWriteContract();
  const publicClient = usePublicClient();
  const [messages, setMessages] = useState<Log[]>();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const events = await publicClient?.getContractEvents({
          address: chatterAddress,
          abi: chatterJson.abi,
          eventName: "Message",
          fromBlock: BigInt("0"),
          toBlock: "latest",
        });
        setMessages(events);
      } catch (error) {
        console.error("Error fetching contract events:", error);
      }
    };
    fetchMessages();
  }, []);

  useWatchContractEvent({
    address: chatterAddress,
    abi: chatterJson.abi,
    eventName: "Message",

    onLogs(logs) {
      console.log("New logs!", logs);
      setMessages((oldLogs) => (oldLogs ? [...oldLogs, ...logs] : [...logs]));
    },
  });

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message && message.length > 0) {
      const contractWriteResponse = await writeContract({
        address: chatterAddress,
        abi: chatterJson.abi,
        functionName: "sendMessage",
        args: [message],
      });
      console.log(contractWriteResponse);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConnectButton />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          Messages
          {messages?.map((log: any, i) => (
            <div key={i}>
              {log.args.sender} - {log.args.message}
            </div>
          ))}
        </div>
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="messagebox"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi there!!!"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => sendMessage(e)}
            type="button"
          >
            Send Message
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Chatter App using ERC43337
      </footer>
    </div>
  );
}
