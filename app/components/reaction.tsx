"use client";

import { TReaction } from "@/app/global/types";

interface ReactionProps {
  reaction: TReaction;
  handleReaction: (reaction: TReaction) => void;
  socketId: string;
}

export default function Reaction({ reaction, handleReaction, socketId }: ReactionProps) {
  return (
    <button
      onClick={() => handleReaction(reaction)}
      className={`reaction-bubble ${reaction.addedBy.includes(socketId) ? "selected" : ""
        } flex items-center gap-1 p-1 rounded-full bg-muted text-sm`}
    >
      <span>{reaction.name}</span>
      <span>{reaction.count}</span>
    </button>
  );
}