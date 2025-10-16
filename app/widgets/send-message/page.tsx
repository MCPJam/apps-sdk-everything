"use client";

import { useSendMessage } from '../../hooks/use-send-message';
import { useState } from 'react';

export default function SendMessageWidget() {
  const sendMessage = useSendMessage();
  const [messagePrompt, setMessagePrompt] = useState("Tell me more about the OpenAI Apps SDK");
  const [messageResult, setMessageResult] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    setMessageResult(null);
    setIsLoading(true);
    try {
      await sendMessage(messagePrompt);
      setMessageResult({ success: true, message: "Message sent to conversation" });
    } catch (error) {
      setMessageResult({ success: false, error: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">💬</span>
          <h2 className="text-xl font-semibold">sendFollowUpMessage()</h2>
        </div>

        <p className="text-sm opacity-90 mb-6">
          Insert a message into the conversation thread from your widget
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Message:</label>
            <textarea
              value={messagePrompt}
              onChange={(e) => setMessagePrompt(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
              placeholder="Enter message to send..."
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="w-full py-3 px-6 text-lg font-semibold bg-white text-green-600 rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>

          {messageResult && (
            <div className={`p-4 rounded-lg border-2 ${
              (messageResult as any).success
                ? 'bg-white/10 border-white/30'
                : 'bg-red-500/20 border-red-300/50'
            }`}>
              <pre className="text-sm font-mono">
                {JSON.stringify(messageResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
