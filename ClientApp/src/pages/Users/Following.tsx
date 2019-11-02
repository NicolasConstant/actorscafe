import React, { useEffect, useState } from "react";
import { postAsync, postWithTokenAsync } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";
import { UserState } from "./Index";
import { toAcctString } from "../../helpers/toAcctString";
import { Link } from "react-router-dom";

export type FollowingState = {
    user?: User;
    error: string;
    users?: User[];
}

export function UsersFollowing(props: any) {
    useEffect(() => {
        (async () => {
            try {
                const user = await postAsync<User>("/users/show", { userName });

                const users = await postAsync<User[]>("/users/followings", { userId: user.id });
                setState({ error: "", user, users });
            } catch(err) {
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

    const [state, setState] = useState<FollowingState>({ error: "" });

    // おそらく undefined にはならない
    const userName = props.match.params.name as string;

    const u = state.user;

    if (state.error) {
        return <p>{state.error}</p>
    } else if (!u) {
        return <p>取得中</p>
    } else {
        return (
            <div>
                <UserHeader user={u} onFollowButtonClicked={toggleFollow}/>                
                <h2>フォロー</h2>
                {
                    state.error ? <p>{state.error}</p> :
                    !state.users ? <p>取得中</p> :
                    <ul>
                        {
                            state.users.length > 0 ?
                                state.users.map(u => 
                                    <li key={u.id}>
                                        <Link to={`/${toAcctString(u)}`}><b>{u.profileName || u.name}</b> {toAcctString(u)}</Link>
                                    </li>
                                ) : "いない"
                        }
                    </ul>
                }
            </div>
        );
    }
}