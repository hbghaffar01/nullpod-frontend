"use client";

import { TReaction } from "@/app/global/types";
import { useSocket } from "@/app/hooks/useSocket";
import { useChat } from "@/app/hooks/useChat";
import { useCallback, useEffect, useRef, useState } from "react";
import Post from "./post";
import { ArrowRight, Paperclip, Smile } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import Picker from "emoji-picker-react";

export default function ChatPage({ activeChatId }: { activeChatId: string | null }) {
  const socket = useSocket();
  const { messages, addMessage } = useChat();
  const [message, setMessage] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const handleReaction = useCallback(
    ({ postId, name, userId }: { postId: string; name: string; userId: string }) => {
      if (!activeChatId) return;
      const existingMessage = messages[activeChatId]?.find((msg) => msg.id === postId);
      if (!existingMessage) return;

      const updatedReactions = existingMessage.reactions.map((reaction) => {
        const updatedAddedBy = reaction.name === name
          ? reaction.addedBy.includes(userId)
            ? reaction.addedBy.filter((user) => user !== userId)
            : [...reaction.addedBy, userId]
          : reaction.addedBy;

        return reaction.name === name
          ? { ...reaction, count: updatedAddedBy.length, addedBy: updatedAddedBy }
          : reaction;
      });

      addMessage(activeChatId, {
        id: postId,
        author: existingMessage.author,
        content: existingMessage.content,
        reactions: updatedReactions,
      });
    },
    [activeChatId, messages, addMessage]
  );

  const addNewReaction = useCallback(
    ({ postId, emoji, userId }: { postId: string; emoji: any; userId: string }) => {
      if (!activeChatId) return;
      const existingMessage = messages[activeChatId]?.find((msg) => msg.id === postId);
      if (!existingMessage) return;

      const existingReaction = existingMessage.reactions.find((r) => r.name === emoji.emoji);
      const updatedReactions: TReaction[] = existingReaction
        ? existingMessage.reactions.map((reaction) =>
          reaction.name === emoji.emoji
            ? {
              ...reaction,
              count: reaction.count + 1,
              addedBy: [...reaction.addedBy, userId],
            }
            : reaction
        )
        : [
          ...existingMessage.reactions,
          { id: uuidv4(), name: emoji.emoji, count: 1, addedBy: [userId] },
        ];

      addMessage(activeChatId, {
        id: postId,
        author: existingMessage.author,
        content: existingMessage.content,
        reactions: updatedReactions,
      });
    },
    [activeChatId, messages, addMessage]
  );

  const sendMessage = () => {
    if (socket && message && socket.id && activeChatId) {
      const messageId = uuidv4();
      socket.emit("message", {
        id: messageId,
        text: message,
        sender: socket.id,
      });

      addMessage(activeChatId, {
        id: messageId,
        author: socket.id,
        content: message,
        reactions: [],
      });

      setMessage("");
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
    setOpenPicker(false);
  };

  useEffect(() => {
    if (!socket || !activeChatId) return;

    const handleMessage = (data: { id: string; text: string; sender: string }) => {
      addMessage(activeChatId, {
        id: data.id,
        author: data.sender,
        content: data.text,
        reactions: [],
      });
    };

    socket.on("message", handleMessage);
    socket.on("handle_reaction", handleReaction);
    socket.on("add_reaction", addNewReaction);

    return () => {
      socket.off("message", handleMessage);
      socket.off("handle_reaction", handleReaction);
      socket.off("add_reaction", addNewReaction);
    };
  }, [socket, activeChatId, handleReaction, addNewReaction, addMessage]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (
      socket &&
      activeChatId &&
      messages[activeChatId]?.length > 0 &&
      messages[activeChatId][messages[activeChatId].length - 1].author === socket.id
    ) {
      scrollToBottom();
    }
  }, [messages, socket, activeChatId]);

  if (!activeChatId) return null;
  if (!socket) return <div>Connecting to chat...</div>;

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {messages[activeChatId]?.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Post
                postId={msg.id}
                socket={socket}
                author={msg.author}
                content={msg.content}
                reactions={msg.reactions}
                isLast={index === messages[activeChatId].length - 1}
              />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      <div className="relative flex items-center gap-2 p-2 bg-muted rounded-lg border border-teal-500">
        <button className="text-muted-foreground">
          <Paperclip size={20} />
        </button>

        <input
          placeholder="Type a message..."
          className="flex-1 p-2 bg-transparent outline-none"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <div className="relative">
          <button
            onClick={() => setOpenPicker((prev) => !prev)}
            className="text-muted-foreground"
          >
            <Smile size={20} />
          </button>
          {openPicker && (
            <div className="absolute bottom-10 right-0 z-50">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <button className="text-teal-500" onClick={sendMessage}>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
