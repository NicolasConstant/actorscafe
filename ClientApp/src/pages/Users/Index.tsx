import React, { useEffect, useState } from "react";
import { postAsync, postWithTokenAsync } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";
import { Post } from "../../models/Post";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/Container";

export type UserState = {
    user?: User;
    error: string;
    timeline?: Post[];
};

export function UsersIndex(props: any) {
    useEffect(() => {
        (async () => {
            try {
                const user = await postAsync<User>("/users/show", { userName });
                setState(prev => ({ ...prev, error: "", user, }));

                const timeline = await postAsync<Post[]>("/posts/users", { userId: user.id });
                setState(prev => ({ ...prev, timeline }));
            } catch (err) {
                // エラーならエラー                
                setState(prev => ({ ...prev, error: err.message }));
            }
        })();
    }, [props]);

    async function toggleFollow() {
        if (!state.user) return;

        // フォロー
        await postWithTokenAsync(state.user.isFollowed ? "following/delete" : "/following/create", {
            userId: state.user.id,
        });

        const user = await postAsync<User>("/users/show", { userName });
        setState(prev => ({ ...prev, error: "", user, }));
    }

    const [state, setState] = useState<UserState>({ error: "", timeline: [], });

    // おそらく undefined にはならない
    const userName = props.match.params.name as string;

    const u = state.user;

    if (state.error) {
        return <p>{state.error}</p>
    } else if (!u) {
        return <p>取得中</p>
    } else {
        return (
            <Container>
                <UserHeader user={u} onFollowButtonClicked={toggleFollow} />
                <Posts posts={state.timeline || []} placeholder="このユーザーはまだ何も投稿していないようです。" />
            </Container>
        );
    }
}