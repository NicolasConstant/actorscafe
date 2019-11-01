import React from "react";
import { User } from "../models/User";
import { Link } from "react-router-dom";
import { useStore } from "../store/module";
import { toAcctString } from "../helpers/toAcctString";

export function UserHeader(props: { user: User }) {
    const u = props.user;
    const acct = toAcctString(u);
    const store = useStore();

    return (
        <div>
            <h1>{u.profileName || u.name}</h1>
            <p>ID: {acct} { u.isLocked ? "🔒" : "" }</p>
            <p>{u.description || "自己紹介はありません。"}</p>
            <p>
                <Link to={`/@${u.name}`}>{u.postsCount} 投稿</Link>
                &emsp;
                <Link to={`/@${u.name}/following`}>{u.followingsCount} フォロー</Link>
                &emsp;
                <Link to={`/@${u.name}/followers`}>{u.followersCount} フォロワー</Link>
            </p>
            { store.user && u.id !== store.user.id ? <div><button>フォローする</button></div> : null }
        </div>
    );
}