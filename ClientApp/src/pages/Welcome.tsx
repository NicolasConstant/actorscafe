import React, { useState, useEffect } from "react";
import { mod } from "../store/module";
import { useDispatch } from "react-redux";
import { signUpAsync, signInAsync, getMetaAsync } from "../services/api";
import { Link } from "react-router-dom";
import marked from "marked";
import { UIButton } from "../components/ui/UIButton";
import { Container } from "../components/Container";
import { UITextInput } from "../components/ui/UITextInput";
import { UIPasswordInput } from "../components/ui/UIPasswordInput";
import { UICheckBox } from "../components/ui/UICheckBox";

export type WelcomeMode = "signup" | "signin";

export function Welcome(_: any) {
    const [state, setState] = useState({
        current: "signin" as WelcomeMode,
        userName: "",
        password: "",
        error: "",
        agreeToS: false,
        description: "",
    });
    const dispatch = useDispatch();

    const updateState = (obj: any) => setState(prev => ({ ...prev, ...obj }));

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
            updateState({ error: err.message });
            return;
        }
    }

    async function handleSignIn() {
        try {
            const res = (await signInAsync(state.userName, state.password));
            dispatch(mod.actions.setToken(res));
        } catch (err) {
            updateState({ error: err.message });
            return;
        }
    }

    function changeMode(state: WelcomeMode) {
        updateState({ current: state });
        updateState({ error: "" });
    }

    function confirmSignUp() {
        return !!(state.password && state.userName && state.agreeToS);
    }

    function confirmSignIn() {
        return !!(state.userName && state.password);
    }

    let form;
    switch (state.current) {
        case "signin":
            form =
                <div>
                    <h3>お持ちのアカウントでログイン</h3>
                    <UITextInput value={state.userName} placeholder="ユーザー名" onChange={ev => updateState({ userName: ev.target.value })} />
                    <UIPasswordInput value={state.password} placeholder="パスワード" onChange={ev => updateState({ password: ev.target.value })} />
                    {state.error ? <p style={{ color: "red", fontWeight: "bold" }}>{state.error}</p> : null}
                    <UIButton inline disabled={!confirmSignIn()} onClick={handleSignIn}>ログイン</UIButton>
                    <UIButton inline link onClick={() => changeMode("signup")}>アカウントを作成</UIButton>
                </div>;
            break;
        case "signup":
            form =
                <div>
                    <h3>アカウントを作成</h3>
                    <UITextInput placeholder="ユーザー名" value={state.userName} onChange={ev => updateState({ userName: ev.target.value })} />
                    <UIPasswordInput placeholder="パスワード" value={state.password} hasAutoComplete onChange={ev => updateState({ password: ev.target.value })} />
                    <label>
                        <UICheckBox checked={state.agreeToS} onChange={ev => updateState({ agreeToS: ev.target.checked })}>
                            <a href="/tos" target="_blank" rel="noopener noreferrer">利用規約</a>に同意する
                        </UICheckBox>
                    </label>
                    {state.error ? <p style={{ color: "red", fontWeight: "bold" }}>{state.error}</p> : null}
                    <UIButton inline disabled={!confirmSignUp()} onClick={handleSignUp}>登録</UIButton>
                    <UIButton inline link onClick={() => changeMode("signin")}>お持ちのアカウントでログイン</UIButton>
                </div>;
            break;
        default:
            form = <div>
                <p>謎の状態です。ページをリロードしてください。</p>
            </div>;
            break;
    }
    return (
        <Container style={{ maxWidth: "512px" }}>
            <div dangerouslySetInnerHTML={{ __html: marked(state.description) }} />
            {form}
        </Container>
    );
}