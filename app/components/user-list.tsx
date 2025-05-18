"use client";

import { FileText, Info, Lock, User } from "lucide-react";
import { users } from "@/app/global/users";
import Image from "next/image";
import { useState } from "react";

export default function UserList({ activeUserId }: { activeUserId: string | null }) {
    const activeUser = users.find((user) => user.id === activeUserId);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const [documentSrc, setDocumentSrc] = useState<string | null>(null);
    const [mediaSrcs, setMediaSrcs] = useState<(string | null)[]>(Array(5).fill(null));
    const [postSrcs, setPostSrcs] = useState<(string | null)[]>(Array(4).fill(null));

    if (!activeUser) return null;

    const sharedMedia = [
        "/media/1.jpg",
        "/media/2.jpg",
        "/media/3.jpeg",
        "/media/4.jpeg",
        "/media/5.jpeg",
    ].map((src, index) => ({
        src,
        fallback: "/media/default.jpeg",
        index,
    }));

    const sharedPosts = [
        "/posts/2.jpg",
        "/posts/2.jpg",
        "/posts/3.jpeg",
        "/posts/4.jpeg",
    ].map((src, index) => ({
        src,
        fallback: "/posts/default.jpeg",
        index,
    }));

    return (
        <div className="w-[20rem] h-screen bg-card text-foreground flex flex-col">
            <div className="p-4 flex items-center gap-3">
                <div className="relative">
                    <Image
                        src={avatarSrc || activeUser.avatar}
                        alt={activeUser.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        onError={() => setAvatarSrc("/avatars/avatar1.jpg")}
                        priority={false}
                    />
                    <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${activeUser.status === "online" ? "bg-green-500" : "bg-gray-500"
                            }`}
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{activeUser.name}</h2>
                    <p className="text-sm text-muted-foreground">{activeUser.email.split("@")[0]}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <FileText size={20} />
                    <Lock size={20} />
                    <Info size={20} />
                    <User size={20} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2">SHARED DOCUMENT</h3>
                    <div className="p-2 rounded-lg bg-muted">
                        <Image
                            src={documentSrc || "/documents/1.jpg"}
                            alt="Shared Document"
                            width={200}
                            height={150}
                            className="w-full rounded-lg object-cover"
                            onError={() => setDocumentSrc("/documents/avatar1.jpg")}
                            priority={false}
                        />
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 flex items-center justify-between">
                        SHARED MEDIA
                        <button className="text-primary text-xs">VIEW ALL (1647)</button>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {sharedMedia.map((media) => (
                            <Image
                                key={media.index}
                                src={mediaSrcs[media.index] || media.src}
                                alt={`Media ${media.index + 1}`}
                                width={0}
                                height={0}
                                sizes="auto"
                                className="h-auto w-auto rounded-lg object-cover"
                                onError={() => {
                                    const newMediaSrcs = [...mediaSrcs];
                                    newMediaSrcs[media.index] = media.fallback;
                                    setMediaSrcs(newMediaSrcs);
                                }}
                                priority={false}
                            />

                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2">SHARED POST</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {sharedPosts.map((post) => (
                            <Image
                                key={post.index}
                                src={postSrcs[post.index] || post.src}
                                alt={`Post ${post.index + 1}`}
                                width={64}
                                height={64}
                                className="w-full h-16 object-cover rounded-lg"
                                onError={() => {
                                    const newPostSrcs = [...postSrcs];
                                    newPostSrcs[post.index] = post.fallback;
                                    setPostSrcs(newPostSrcs);
                                }}
                                priority={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}