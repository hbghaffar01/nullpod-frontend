"use client";

export default function ClientLayoutWrapper({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <body className="flex">
            <main className="flex-1">{children}</main>
        </body>
    );
}