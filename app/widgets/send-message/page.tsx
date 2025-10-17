"use client";

import { useSendMessage } from '../../hooks/use-send-message';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Messages</CardTitle>
          <CardDescription>Insert a message into the conversation using sendFollowUpMessage()</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={messagePrompt}
              onChange={(e) => setMessagePrompt(e.target.value)}
              rows={5}
              placeholder="Enter message to send..."
            />
          </div>

          <Button onClick={handleSendMessage} disabled={isLoading} className="w-full">
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>

          {messageResult !== null && (
            <div className={`p-3 border rounded-md ${
              (messageResult as any).success
                ? 'bg-muted'
                : 'border-destructive bg-destructive/10'
            }`}>
              <pre className="text-xs font-mono overflow-x-auto">
                {JSON.stringify(messageResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
