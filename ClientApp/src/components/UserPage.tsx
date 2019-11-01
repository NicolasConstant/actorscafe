import React, { useEffect, useState } from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { apiClient } from "../services/api";
import { User } from "../models/User";
import { Link } from "react-router-dom";

export type UserState = {
    user?: User;
    error: boolean;
};

export function UserPage(props : { match: { params: any } }) {
    useEffect(() => {
        (async () => {
            try {
                const { data, status } = await apiClient.post<User>("/users/show", { userName });
                // エラーならエラー
                setState({ error: false, user: data });
            } catch {
                // エラーならエラー                
                setState(prev => ({ ...prev, error: true }));
            }
        })();
    }, [props]); 

    const dispatch = useDispatch();
    const store = useStore();
    const [state, setState] = useState<UserState>({ error: false });

    // おそらく undefined にはならない
    const userName = props.match.params.name as string;

    const u = state.user;

    if (state.error) {
        return <p>そんなユーザーいないが？？？</p>
    } else if (!u) {
        return <p>待ちな</p>
    } else {
        const acct = u.host ? `@${u.name}@${u.host}` : `@${u.name}`;
        return (
            <div>
                <h2>{u.profileName || u.name}</h2>
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
                <p>多分ここらへんに Post とか出てくる</p>
            </div>
        );
    }
}