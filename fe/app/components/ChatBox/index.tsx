"use client";
import { Log } from "viem";
import ChatMessage from "../ChatMessage";
import { useEffect, useState } from "react";

import {
  useWriteContract,
  usePublicClient,
  useWatchContractEvent,
} from "wagmi";
const chatterJson = require("../../../../contract/artifacts/contracts/Chatter.sol/Chatter.json");
const chatterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ChatBoxComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const { writeContract } = useWriteContract();
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
  });

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message && message.length > 0) {
      await writeContract({
        address: chatterAddress,
        abi: chatterJson.abi,
        functionName: "sendMessage",
        args: [message],
      });
    }
    setMessage("");
  };

  return (
    <>
      <div>
        Messages
        {messages && messages?.length > 0 && (
          <ChatMessage messages={messages} />
        )}
      </div>
      <div className="flex h-12 w-full">
        <input
          className="shadow appearance-none w-full py-2 px-3  dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 rounded-tl-sm rounded-b-sm"
          type="text"
          name="send-message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button
          className="w-1/3 dark:bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-sm rounded-b-sm text-sm"
          onClick={(e) => sendMessage(e)}
          type="button"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatBoxComponent;
