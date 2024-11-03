"use client";

import { Log } from "viem";
import JazziconImage from "../Jazzicon";
import { useAccount } from "wagmi";
import classNames from "classnames";
type Props = {
  messages: Log[];
};
const ChatMessage: React.FC<Props> = ({ messages }) => {
  const { address } = useAccount();

  return (
    <>
      {messages?.map((message: any, id) => (
        <div
          className={classNames(
            "items-start gap-2.5 p-4",
            message.args.sender === address
              ? "flex flex-row-reverse"
              : "flex flex-row"
          )}
          key={id}
        >
          <JazziconImage address={message.args.sender} />
          <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-900">
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
    </>
  );
};

export default ChatMessage;
