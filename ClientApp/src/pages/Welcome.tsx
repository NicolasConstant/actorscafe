import React, { useState, useEffect } from "react";
import { mod } from "../store/module";
import { useDispatch } from "react-redux";
import { signUpAsync, signInAsync, getMetaAsync } from "../services/api";
import { Link } from "react-router-dom";
import marked from "marked";

export type WelcomeMode = "signup" | "signin";

export function Welcome(_: any) {
    const [ state, setState ] = useState({
        current: "signin" as WelcomeMode,
        userName: "",
        password: "",
        passwordConfirm: "",
        error: "",
        confirmToToS: false,
        description: "",
    });
    const dispatch = useDispatch();

    const updateState = (obj: any) => setState(prev=> ({...prev, ...obj}));

    useEffect(() => {
        (async () => {
            updateState({ description: "<p>ActorsCafé へようこそ！</p>" });
            const description = (await getMetaAsync()).description;
            if (description) updateState({ description });
        })();
    }, [null]);

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
    let form;
    switch (state.current) {
        case "signin":
            form = 
                <div>
                    <h3>お持ちのアカウントでログイン</h3>
                    <label>
                        ユーザー名: <input type="text" value={state.userName} onChange={ev => updateState({userName: ev.target.value})} />
                    </label>
                    <label>
                        パスワード: <input type="password" value={state.password} onChange={ev => updateState({password: ev.target.value})} />
                    </label>
                    { state.error ? <p style={{color: "red", fontWeight: "bold"}}>{state.error}</p> : null}
                    <button onClick={handleSignIn}>ログイン</button>
                    <button onClick={() => changeMode("signup")}>アカウントを作成</button>
                </div>;
            break;
        case "signup":
            form = 
                <div>
                    <h3>アカウントを作成</h3>
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
                        <Link to="/tos">利用規約</Link>に同意する
                    </label>
                    { state.error ? <p style={{color: "red", fontWeight: "bold"}}>{state.error}</p> : null}
                    <button onClick={handleSignUp}>登録</button>
                    <button onClick={() => changeMode("signin")}>お持ちのアカウントでログイン</button>
                </div>;
            break;
        default:
            form = <div>
                <p>謎の状態です。ページをリロードしてください。</p>
            </div>;
            break;
    }
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: marked(state.description)}} />
            {form}
        </div>
    );
}