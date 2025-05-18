export type TUser = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: "online" | "offline";
};

export const users: TUser[] = [
    {
        id: "user1",
        name: "Alfredo Workman",
        email: "alfredo.workman@example.com",
        avatar: "/avatars/avatar1.jpg",
        status: "online",
    },
    {
        id: "user2",
        name: "Kianna George",
        email: "kianna.george@example.com",
        avatar: "/avatars/avatar2.jpg",
        status: "online",
    },
    {
        id: "user3",
        name: "Ann Schleifer",
        email: "ann.schleifer@example.com",
        avatar: "/avatars/avatar3.jpg",
        status: "online",
    },
    {
        id: "user4",
        name: "Craig Culhane",
        email: "craig.culhane@example.com",
        avatar: "/avatars/avatar4.jpg",
        status: "offline",
    },
    {
        id: "user5",
        name: "Hussein Saddam",
        email: "hussein.saddam@example.com",
        avatar: "/avatars/avatar5.jpg",
        status: "online",
    },
];