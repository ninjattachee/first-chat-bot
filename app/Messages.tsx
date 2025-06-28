"use client";

import React from "react";
import useMessageStore from "./store";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import type { Components } from "react-markdown";

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const codeRenderer = ({ inline, children, ...props }: any) =>
  inline ? (
    <code className="bg-base-300 px-1 rounded" {...props}>
      {children}
    </code>
  ) : (
    <pre className="bg-base-300 p-2 rounded overflow-x-auto">
      <code>{children}</code>
    </pre>
  );

const markdownComponents: Components = {
  p: ({ node, ...props }) => <p className="my-1 leading-relaxed" {...props} />,
  code: codeRenderer,
  h1: ({ node, ...props }) => (
    <h1 className="font-bold text-lg mt-2 mb-1" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="font-bold text-base mt-2 mb-1" {...props} />
  ),
  ul: ({ node, ...props }) => <ul className="list-disc ml-5 my-1" {...props} />,
  ol: ({ node, ...props }) => (
    <ol className="list-decimal ml-5 my-1" {...props} />
  ),
  li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
};

const Messages = () => {
  const { messages } = useMessageStore();

  return (
    <div className="chat-container w-full max-w-3xl mx-auto flex-grow">
      <div
        id="messages"
        className="flex flex-col gap-4 px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300"
        style={{ minHeight: "300px" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={messageVariants}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className={
                message.role === "user" ? "chat chat-end" : "chat chat-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "chat-bubble chat-bubble-info text-base-content shadow-md"
                    : "chat-bubble bg-base-200 text-base-content shadow-md"
                }
                style={{ maxWidth: "80%" }}
              >
                <ReactMarkdown components={markdownComponents}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Messages;
