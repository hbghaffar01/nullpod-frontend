import { useState } from "react";
import { TPost } from "@/app/global/types";
import { v4 as uuidv4 } from "uuid";

export function useChat() {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ [key: string]: TPost[] }>({});

    const setActiveChat = (userId: string | null) => {
        setActiveChatId(userId);
        if (userId && !messages[userId]) {
            setMessages((prev) => ({ ...prev, [userId]: [] }));
        }
    };

    const addMessage = (userId: string, message: TPost) => {
        const messageWithUniqueId = { ...message, id: message.id || uuidv4() };

        setMessages((prev) => {
            const userMessages = prev[userId] || [];
            const existingMessageIndex = userMessages.findIndex((msg) => msg.id === messageWithUniqueId.id);

            if (existingMessageIndex !== -1) {
                const updatedMessages = [...userMessages];
                updatedMessages[existingMessageIndex] = {
                    ...updatedMessages[existingMessageIndex],
                    reactions: messageWithUniqueId.reactions.length > 0
                        ? messageWithUniqueId.reactions
                        : updatedMessages[existingMessageIndex].reactions,
                };
                return {
                    ...prev,
                    [userId]: updatedMessages,
                };
            } else {
                return {
                    ...prev,
                    [userId]: [...userMessages, messageWithUniqueId],
                };
            }
        });
    };

    return { activeChatId, messages, setActiveChat, addMessage };
}