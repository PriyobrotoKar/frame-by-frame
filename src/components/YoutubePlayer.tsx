"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function YoutubePlayer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="aspect-video rounded-lg overflow-hidden ">
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        url={"https://www.youtube.com/watch?v=BTIbktPxyz0"}
      />
    </div>
  );
}
