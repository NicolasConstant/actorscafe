import React, { useEffect, useState } from "react";
import { postAsync } from "../../services/api";
import { User } from "../../models/User";
import { UserHeader } from "../../components/UserHeader";
import { UserState } from "./Index";
import { toAcctString } from "../../helpers/toAcctString";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container";

export type UsersDirectoryState = {
    users?: User[];
    error: string;
};

export function UserDirectory(props: any) {
    useEffect(() => {
        (async () => {
            try {
                const data = await postAsync<User[]>("/users/all");
                setState({ error: "", users: data });
            } catch (err) {
                // エラーならエラー                
                setState(prev => ({ ...prev, error: err.message }));
            }
        })();
    }, [props]);

    const [state, setState] = useState<UsersDirectoryState>({ error: "" });

    const list = state.users;

    return (
        <Container>
            <h1>ユーザーディレクトリ</h1>
            {
                state.error ? <p>{state.error}</p> :
                    !state.users ? <p>取得中</p> :
                        <ul>
                            {state.users.map(u => <li key={u.id}><Link to={`/${toAcctString(u)}`}><b>{u.profileName || u.name}</b> {toAcctString(u)}</Link></li>)}
                        </ul>
            }
        </Container>
    );
}