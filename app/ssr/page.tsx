'use client';

import { useChat } from 'ai/react';
import {useScrollToView} from "@/hooks/useScrollToView";
import Link from "next/link";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();
  const messageEndRef = useScrollToView(messages);

  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">

        {/* Back button to return to home page */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center text-white text-2xl">
            ⬅
          </Link>
        </div>

        {/* The Feed where all messages ge=t rendered */}
        <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
          {messages.map(message => (
              <div
                  key={message.id}
                  className={`p-2 my-2 rounded ${
                      message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                  }`}
              >
                {message.role === 'user' ? 'User: ' : 'AI: '}
                {message.content}
              </div>
          ))}
          <div ref={messageEndRef}/>
        </div>

        {/* The Prompt control*/}
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-800 sticky bottom-0">
          <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="w-full p-2 bg-gray-900 text-white rounded"
          />
          <button type="submit" className="mt-2 w-full p-2 bg-blue-600 rounded">
            Send
          </button>
        </form>

      </div>
  );
}
