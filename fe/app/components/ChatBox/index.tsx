"use client";
import { Log } from "viem";
import ChatMessage from "../ChatMessage";
import { useEffect, useState, MouseEvent } from "react";
import {
  useWriteContract,
  usePublicClient,
  useWatchContractEvent,
} from "wagmi";

import { contractAbi } from "@/utils/web3";
const chatterAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const ChatBoxComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const { writeContract } = useWriteContract();
  const publicClient = usePublicClient();
  const [messages, setMessages] = useState<Log[]>();
  const [latestBlock, setLatestBlock] = useState<bigint>();

  useWatchContractEvent({
    address: chatterAddress,
    abi: contractAbi,
    eventName: "Message",
    fromBlock: latestBlock ? latestBlock : BigInt("0"),
    onLogs(logs) {
      setMessages((oldLogs) => {
        const newLogs = logs.filter(
          (newLog) =>
            !oldLogs?.some(
              (oldLog) => oldLog.transactionHash === newLog.transactionHash
            )
        );
        return newLogs.length ? [...(oldLogs || []), ...newLogs] : oldLogs;
      });
    },
    pollingInterval: 20_000, // needs to change this to websocket
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chatterAddress) {
          const events = await publicClient?.getContractEvents({
            address: chatterAddress,
            abi: contractAbi,
            eventName: "Message",
            fromBlock: BigInt("0"),
            toBlock: "latest",
          });

          setMessages(events);
          if (events && events.length > 0) {
            // Get the latest block number from the events array
            const latestBlock = events[events.length - 1].blockNumber;
            setLatestBlock(latestBlock);
            console.log(`Latest block with events: ${latestBlock}`);
          } else {
            console.log("No new events found");
          }
        } else {
          console.warn(`Warning address is not found ${chatterAddress}`);
        }
      } catch (error) {
        console.error("Error fetching contract events:", error);
      }
    };

    fetchMessages();
  }, [publicClient]);

  const sendMessage = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (message && message.length > 0) {
      await writeContract({
        address: chatterAddress,
        abi: contractAbi,
        functionName: "sendMessage",
        args: [message],
      });
    }
    setMessage("");
  };

  return (
    <>
      <div className="w-full max-w-7xl">
        {messages && messages?.length > 0 && (
          <ChatMessage messages={messages} />
        )}
      </div>
      <div className="flex h-12 w-full">
        <form className="w-full">
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <textarea
              name="send-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            />
            <button
              onClick={(e) => sendMessage(e)}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBoxComponent;
