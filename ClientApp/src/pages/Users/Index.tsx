import React, { useEffect, useState } from "react";
import { postAsync } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";

export type UserState = {
    user?: User;
    error: string;
};

export function UsersIndex(props: any) {
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
        return <p>取得中</p>
    } else {
        return (
            <div>
                <UserHeader user={u}/>
                <p>ここにユーザータイムラインを表示する予定</p>
            </div>
        );
    }
}