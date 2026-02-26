"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export function VideosList({ videos }: { videos: VideoItem[] }) {
  const [open, setOpen] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setPlayingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPlayingId(null);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              type="button"
              onClick={() => handleOpen(video.id)}
              className="group w-full rounded-lg border bg-card overflow-hidden text-left shadow-sm transition hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="aspect-video w-full bg-muted relative overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-4xl">
                    ▶
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="line-clamp-2 text-sm font-medium leading-tight">
                  {video.title || video.id}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent
          className="max-w-3xl p-0 overflow-hidden"
          showCloseButton
          bottomStickOnMobile={false}
        >
          <DialogTitle className="sr-only">
            {playingId ? "Xem video" : ""}
          </DialogTitle>
          {playingId && (
            <div className="aspect-video w-full bg-black">
              <iframe
                title="YouTube video"
                src={`https://www.youtube.com/embed/${playingId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
