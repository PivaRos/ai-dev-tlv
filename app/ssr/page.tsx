'use client';

import {useScrollToView} from "@/hooks/useScrollToView";
import {Top} from "@/shared/top";
import {FormEvent, useState} from "react";
import { useActions, useUIState } from 'ai/rsc';
import {AIContext} from "@/providers/ai";

export default function Page() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState<typeof AIContext>();
  const { submitUserMessage } = useActions();

  const conversationEndRef = useScrollToView(conversation as any);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput('');
    setConversation(currentConversation => [
      ...currentConversation,
      <div>{input}</div>,
    ]);
    const message = await submitUserMessage(input);
    setConversation(currentConversation => [...currentConversation, message]);
  };

  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">

      <Top label={'SSR'} />

        {/* The Feed where all messages ge=t rendered */}
        <div className="w-full max-w-md flex-grow overflow-y-auto p-4">

          {conversation.map((message: any , i) => (
              <div key={i}
                   className={`p-2 my-2 rounded text-white bg-blue-500`}
              >{message}</div>
          ))}

          <div ref={conversationEndRef}/>
        </div>

        {/* The Prompt control*/}
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-800 sticky bottom-0">
          <input
              value={input}
              onChange={e => setInput(e.target.value)}
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
