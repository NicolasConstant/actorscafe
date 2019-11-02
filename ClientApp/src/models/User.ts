export interface User {
    id: string;
    name: string;
    description: string;
    profileName?: string;
    avatarUrl?: string;
    followersCount: number;
    followingsCount: number;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
    isFreezed: boolean;
    isLocked: boolean;
    isBot: boolean;
    isCat: boolean;
    isAdmin: boolean;
    isModerator: boolean;
    isBlockingMe?: boolean;
    isBlocked?: boolean;
    isMuted?: boolean;
    isFollowingMe?: boolean;
    isFollowed?: boolean;
    host?: string;
}