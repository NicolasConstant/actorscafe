import React, { useEffect, useState } from "react";
import { postAsync } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";
import { UserState } from "./Index";

export function UsersFollowing(props: any) {
    useEffect(() => {
        (async () => {
            try {
                const data = await postAsync<User>("/users/show", { userName });
                setState({ error: "", user: data });
            } catch(err) {
                // エラーならエラー                
                setState(prev => ({ ...prev, error: err.message }));
            }
        })();
    }, [props]); 

    const [state, setState] = useState<UserState>({ error: "" });

    // おそらく undefined にはならない
    const userName = props.match.params.name as string;

    const u = state.user;

    if (state.error) {
        return <p>{state.error}</p>
    } else if (!u) {
        return <p>待ちな</p>
    } else {
        return (
            <div>
                <UserHeader user={u}/>
                <p>多分ここらへんにフォローしているユーザーが出てくる</p>
            </div>
        );
    }
}