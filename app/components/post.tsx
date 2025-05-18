"use client";

import { TReaction } from "@/app/global/types";
import { Socket } from "socket.io-client";
import Reaction from "./reaction";
import { motion } from "framer-motion";

interface PostProps {
  postId: string;
  socket: Socket | null;
  author: string;
  content: string;
  reactions: TReaction[];
  isLast: boolean;
}

export default function Post({
  postId,
  socket,
  author,
  content,
  reactions,
  isLast,
}: PostProps) {
  const handleReaction = (reaction: TReaction) => {
    if (!socket) return;
    socket.emit("handle_reaction", {
      postId,
      name: reaction.name,
      userId: socket.id,
    });
  };

  return (
    <div className="relative flex flex-col gap-1">
      <div
        className={`message-bubble ${author === socket?.id ? "sent" : "received"} p-2 my-2`}
      >
        <p>{content}</p>
      </div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 1],
        }}
        transition={{ duration: 0.5 }}
        className={`flex gap-1 ${author === socket?.id ? "justify-end" : "justify-start"} flex-wrap ${isLast ? "mb-4" : ""}`}
      >
        {reactions.map((reaction) => (
          <Reaction
            key={reaction.id}
            reaction={reaction}
            handleReaction={handleReaction}
            socketId={socket?.id || ""}
          />
        ))}
      </motion.div>
    </div>
  );
}
