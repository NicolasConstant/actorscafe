import { User } from "./User";

export interface Post {
    id: string;
    userId: string;
    text?: string;
    cw?: string;
    visibility: "public" | "followers" | "direct";
    createdAt: Date;
    repostCount: number;
    isLocalOnly: boolean;
    repostId?: string;
    replyId?: string;
    repost?: Post;
    reply?: Post;
    user: User;
}