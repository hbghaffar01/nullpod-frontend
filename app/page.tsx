"use client";

import { useChat } from "@/app/hooks/useChat";
import ChatPage from "@/app/components/chat";
import DraggableChat from "@/app/components/draggable-chat";
import Sidebar from "@/app/components/sidebar";
import UserList from "@/app/components/user-list";

export default function ComponentPage() {
  const { activeChatId, setActiveChat } = useChat();

  return (
    <div className="flex h-screen">
      <Sidebar onSelectChat={setActiveChat} />
      <div className="flex-1 relative">
        {activeChatId && (
          <DraggableChat onClose={() => setActiveChat(null)}>
            <ChatPage activeChatId={activeChatId} />
          </DraggableChat>
        )}
      </div>
      <UserList activeUserId={activeChatId} />
    </div>
  );
}