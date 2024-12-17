'use client';

import { useChat } from 'ai/react';
import {Message} from "ai";
import ColorPicker from "@/app/csr/ColorPicker";
import ColorPreview from "@/app/csr/ColorPreview";
import {useScrollToView} from "@/hooks/useScrollToView";
import {Top} from "@/shared/top";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();
  const messageEndRef = useScrollToView(messages);

  const renderUI = (message: Message) => {
    const handleColorSelected = async (rgb: string) => {
      await append({
        role: 'user',
        content: `my selected color in RGB is ${rgb}. recommend me a color that matched`,
      });
    }

    return message.toolInvocations?.map(toolInvocation => {
      const { toolName, toolCallId, state } = toolInvocation;

      if (state === 'result') {
        if (toolName === 'chooseColor') {
          const { result } = toolInvocation;
          return (
              <div key={toolCallId}>
                <ColorPicker {...result} onColorSelected={handleColorSelected} />
              </div>
          );
        }
        if (toolName === 'suggestedColor') {
          const { result } = toolInvocation;
          return (
              <div key={toolCallId}>
                <ColorPreview rgb={result.rgbString} />
              </div>
          );
        }
      } else {
        return (
            <div key={toolCallId}>
              {toolName === 'chooseColor' ? (
                  <div>Loading color picker...</div>
              ) : null}
            </div>
        );
      }
    })
  }

  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">

        <Top label="CSR"/>

        {/* The Feed where all messages ge=t rendered */}
        <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
          {messages.map(message => (
              <div
                  key={message.id}
                  className={`p-2 my-2 rounded text-white ${
                      message.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
              >
                {message.role === 'user' ? 'User: ' : 'AI: '}
                {message.content}
                <div>
                  {renderUI(message)}
                </div>
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
