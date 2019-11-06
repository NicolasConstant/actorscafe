import { User } from "./User";
import { Visibility } from "./Visibility";

export interface Post {
    id: string;
    userId: string;
    text?: string;
    cw?: string;
    visibility: Visibility;
    createdAt: Date;
    repostCount: number;
    isLocalOnly: boolean;
    repostId?: string;
    replyId?: string;
    repost?: Post;
    reply?: Post;
    user: User;
}
