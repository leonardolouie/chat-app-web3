"use client";
import { useEffect, useRef } from "react";
import { Log } from "viem";
import JazziconImage from "../Jazzicon";
import { useAccount } from "wagmi";
import classNames from "classnames";

type Props = {
  messages: Log[];
};
const ChatMessage: React.FC<Props> = ({ messages }) => {
  const { address } = useAccount();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-h-[1000px] overflow-auto custom-scrollbar">
      {messages?.map((message: any, id) => (
        <div
          className={classNames(
            "items-start gap-2.5 p-4 max-h-72",
            message.args.sender === address
              ? "flex flex-row-reverse"
              : "flex flex-row"
          )}
          key={id}
        >
          <JazziconImage address={message.args.sender} />
          <div
            className={classNames(
              "flex flex-col  leading-1.5 p-4 border-gray-200 bg-gray-100 dark:bg-gray-700",
              message.args.sender === address
                ? "rounded-s-xl rounded-ee-xl"
                : "rounded-e-xl rounded-es-xl"
            )}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {message.args.sender}
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {message.args.message}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;
