"use client";

import { Bell, MessageSquare, User, Users, X, Instagram, Linkedin } from "lucide-react";
import { users, TUser } from "@/app/global/users";
import Image from 'next/image'

export default function Sidebar({ onSelectChat }: { onSelectChat: (userId: string) => void }) {

    const categories = [
        { name: "haseeb01", icon: X, count: 12 },
        { name: "abubakar01", icon: Instagram, count: 24 },
        { name: "omar02", icon: MessageSquare, count: 132 },
        { name: "osman03", icon: Linkedin, count: 2 },
        { name: "ali04", icon: User, count: 16 },
    ];

    return (
        <div className="w-64 h-screen bg-card text-foreground flex flex-col">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Message category</h2>
                <Bell size={20} />
            </div>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search Message..."
                    className="w-full p-2 rounded-lg bg-muted text-foreground"
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                        >
                            <category.icon size={20} />
                            <span>{category.name}</span>
                            <span className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                                {category.count}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Users size={16} /> DIRECT MESSAGE
                        <span className="ml-auto text-xs">Newest</span>
                    </h3>
                    {users.map((user: TUser) => (
                        <div
                            key={user.id}
                            onClick={() => onSelectChat(user.id)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                        >
                            <div className="relative">
                                <Image
                                    src={user.avatar}
                                    alt={`Image ${user.name + 1}`}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                    onError={(e) => (e.currentTarget.src = "/avatars/avatar1.jpg")}
                                />
                                <span
                                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${user.status === "online" ? "bg-green-500" : "bg-gray-500"
                                        }`}
                                />
                            </div>
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}