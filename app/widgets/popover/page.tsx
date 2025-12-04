"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function PopoverWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-6" style={{ height: '500px' }}>
      <h1 className="text-2xl font-bold mb-4">Popover Widget</h1>
      <p className="text-gray-600 mb-6">Click the button to test the popover component.</p>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">Sample Popover Content</h4>
            <p className="text-sm text-gray-600">
              This is a sample popover for testing purposes. You can add any content here.
            </p>
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}