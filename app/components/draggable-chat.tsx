"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { Minimize2, Maximize2, X } from "lucide-react";

export default function DraggableChat({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose: () => void;
}) {
    const dragRef = useRef<HTMLDivElement>(null);

    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <Draggable handle=".handle" nodeRef={dragRef as React.RefObject<HTMLElement>}>
            <Resizable
                defaultSize={{ width: 500, height: 600 }}
                minWidth={300}
                minHeight={isMinimized ? 40 : 400}
                maxWidth={800}
                maxHeight={isMinimized ? 40 : 800}
                className="absolute bg-card rounded-lg shadow-lg border border-border"
            >
                <div ref={dragRef} className="flex flex-col h-full">
                    <div className="handle flex items-center justify-between p-2 bg-muted rounded-t-lg cursor-move">
                        <span className="text-sm font-semibold text-teal-500">Chat</span>
                        <div className="flex gap-2">
                            <button onClick={() => setIsMinimized(!isMinimized)}>
                                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                            </button>
                            <button onClick={onClose}>
                                <X className="text-teal-500" size={16} />
                            </button>
                        </div>
                    </div>
                    {!isMinimized && <div className="flex-1 overflow-y-auto">{children}</div>}
                </div>
            </Resizable>
        </Draggable>
    );
}
