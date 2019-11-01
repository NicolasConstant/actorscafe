import React, { useState } from "react";
import { mod } from "../store/module";
import { useDispatch } from "react-redux";
import { signUpAsync, signInAsync } from "../services/api";
import { AxiosError } from "axios";
import { ApiError } from "../services/ApiError";

export type WelcomeMode = "signup" | "signin";

export function Welcome(_: any) {
    const [ state, setState ] = useState({
        current: "signin" as WelcomeMode,
        userName: "",
        password: "",
        passwordConfirm: "",
        error: "",
        confirmToToS: false,
    });
    const dispatch = useDispatch();

    const updateState = (obj: any) => setState(prev=> ({...prev, ...obj}));

    async function handleSignUp() {
        try {
            const res = (await signUpAsync(state.userName, state.password));
            dispatch(mod.actions.setToken(res));
        } catch (err) {
            updateState({error: err.message});
            return;
        }
    }

    async function handleSignIn() {
        try {
            const res = (await signInAsync(state.userName, state.password));
            dispatch(mod.actions.setToken(res));
        } catch (err) {
            updateState({error: err.message});
            return;
        }
    }

    function changeMode(state: WelcomeMode) {
        updateState({current: state});
        updateState({error: ""});
    }

    switch (state.current) {
        case "signin":
            return (
                <div>
                    <h2>お持ちのアカウントでログイン</h2>
                    <label>
                        ユーザー名: <input type="text" value={state.userName} onChange={ev => updateState({userName: ev.target.value})} />
                    </label>
                    <label>
                        パスワード: <input type="password" value={state.password} onChange={ev => updateState({password: ev.target.value})} />
                    </label>
                    { state.error ? <p style={{color: "red", fontWeight: "bold"}}>{state.error}</p> : null}
                    <button onClick={handleSignIn}>ログイン</button>
                    <button onClick={() => changeMode("signup")}>アカウントを作成</button>
                </div>
            );
        case "signup":
                return (
                    <div>
                        <h2>アカウントを作成</h2>
                        <label>
                            ユーザー名: <input type="text" value={state.userName} onChange={ev => updateState({userName: ev.target.value})} />
                        </label>
                        <label>
                            パスワード: <input type="password" value={state.password} onChange={ev => updateState({password: ev.target.value})} />
                        </label>
                        <label>
                            パスワード(確認): <input type="password" value={state.passwordConfirm} onChange={ev => updateState({passwordConfirm: ev.target.value})} />
                        </label>
                        <label>
                            <input type="checkbox" checked={state.confirmToToS} onChange={ev => updateState({confirmToToS: ev.target.checked})} />
                            <a href="#">利用規約(まだないよ)</a>に同意する
                        </label>
                        { state.error ? <p style={{color: "red", fontWeight: "bold"}}>{state.error}</p> : null}
                        <button onClick={handleSignUp}>登録</button>
                        <button onClick={() => changeMode("signin")}>お持ちのアカウントでログイン</button>
                    </div>
                );

        default:
            // bug
            throw new Error(`Invalid state "${state.current}" in the Welcome page`);
    }
}