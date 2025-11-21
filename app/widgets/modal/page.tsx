"use client";

import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOpenAIGlobal } from "@/app/hooks/use-openai-global";

export default function DisplayModeWidget() {
  const view = useOpenAIGlobal("view");
  const viewParams = view?.params;
  const isModalView = view?.mode === "modal";
  const message =
    viewParams && typeof (viewParams as { message?: unknown }).message === "string"
      ? (viewParams as { message: string }).message
      : "This is a modal! add more interaction here";

  const handleRequestModal = useCallback(
    ({
      title,
      params,
      anchorElement,
    }: {
      title: string;
      params: Record<string, unknown>;
      anchorElement?: HTMLElement | null;
    }) => {
      if (isModalView) {
        return;
      }

      const anchorRect = anchorElement?.getBoundingClientRect();
      console.log("anchorRect", anchorRect);
      const anchor =
        anchorRect == null
          ? undefined
          : {
              top: anchorRect.top,
              left: anchorRect.left,
              width: anchorRect.width,
              height: anchorRect.height,
            };

      void (async () => {
        try {
          await window?.openai?.requestModal?.({
            title,
            params,
            ...(anchor ? { anchor } : {}),
          });
        } catch (error) {
          console.error("Failed to open modal", error);
        }
      })();
    },
    [isModalView],
  );

  if (isModalView) {
    return (
      <div className="w-full p-6">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Modal Preview</CardTitle>
            <CardDescription>Requested via requestModal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Modal</CardTitle>
          <CardDescription>Request a modal to be displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          <Button
            className="w-full cursor-pointer"
            onClick={(event) =>
              handleRequestModal({
                title: "Modal Demo",
                params: { message },
                anchorElement: event.currentTarget,
              })
            }
          >
            Request Modal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
