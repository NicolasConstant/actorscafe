import React, { useEffect, useState } from "react";
import { apiClient } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";

export type UserState = {
    user?: User;
    error: boolean;
};

export function UsersIndex(props: any) {
    useEffect(() => {
        (async () => {
            try {
                const { data } = await apiClient.post<User>("/users/show", { userName });
                setState({ error: false, user: data });
            } catch {
                // エラーならエラー                
                setState(prev => ({ ...prev, error: true }));
            }
        })();
    }, [props]); 

    const [state, setState] = useState<UserState>({ error: false });

    // おそらく undefined にはならない
    const userName = props.match.params.name as string;

    const u = state.user;

    if (state.error) {
        return <p>そんなユーザーいないが？？？</p>
    } else if (!u) {
        return <p>待ちな</p>
    } else {
        return (
            <div>
                <UserHeader user={u}/>
                <p>多分ここらへんに Post とか出てくる</p>
            </div>
        );
    }
}