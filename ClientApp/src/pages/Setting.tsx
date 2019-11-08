import React, { useState } from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "../components/Container";
import { UIButton } from "../components/ui/UIButton";
import { Section } from "../components/Section";
import { UITextInput } from "../components/ui/UITextInput";
import { UITextarea } from "../components/ui/UITextarea";
import { Card } from "../components/Card";
import { Horizontal } from "../components/Horizontal";
import { UICheckBox } from "../components/ui/UICheckBox";
import { postAsync } from "../services/api";
import { User } from "../models/User";

export function Setting(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    const history = useHistory();

    const [profileName, setName] = useState<string>(store.user ? store.user.profileName || "" : "");
    const [description, setDesc] = useState<string>(store.user ? store.user.description : "");
    const [isBot, setIsBot] = useState<boolean>(store.user ? store.user.isBot : false);
    const [isCat, setIsCat] = useState<boolean>(store.user ? store.user.isCat : false);

    function onLogoutButtonClick() {
        dispatch(mod.actions.resetToken());
        history.push("/");
    }

    async function save() {
        try {
            await postAsync("me/update", {
                profileName, description, isBot, isCat
            });
            const newUser = await postAsync<User>("me");
            dispatch(mod.actions.setUser(newUser));
            alert("設定しました。");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <Container>
            <h1>設定</h1>
            <Card>
                <h2>プロフィール</h2>
                <UITextInput placeholder="名前" value={profileName} onChange={(ev) => setName(ev.target.value)} />
                <UITextarea placeholder="自己紹介" value={description} onChange={(ev) => setDesc(ev.target.value)} />

                <UICheckBox checked={isBot} onChange={ev => setIsBot(ev.target.checked)}>
                    このアカウントは BOT です
                </UICheckBox>
                <UICheckBox checked={isCat} onChange={ev => setIsCat(ev.target.checked)}>
                    このアカウントは CAT です
                </UICheckBox>
                <Horizontal>
                    <UIButton onClick={() => alert("未実装")}>アバターを変更</UIButton>
                    <UIButton onClick={() => alert("未実装")}>ヘッダーを変更</UIButton>
                </Horizontal>
                <UIButton onClick={save}>保存</UIButton>
            </Card>
            <Card>
                <h2>API</h2>
                <p>すまん！API ドキュメントはまだできていないんだ……</p>
                <h3>トークン</h3>
                <p>
                    以下のトークンをリクエストボディのjsonに "token" というキーで付加することで、認証が必要な API にアクセスできます。
                    このトークンを知っているユーザーは誰でもあなたのアカウントを操作できてしまうので、<strong>絶対にトークンを漏洩させないでください。</strong>
                </p>
                <UITextInput readOnly value={store.token} />
            </Card>
            <Card>
                <UIButton onClick={onLogoutButtonClick}>ログアウトする</UIButton>
            </Card>
        </Container>
    );
}