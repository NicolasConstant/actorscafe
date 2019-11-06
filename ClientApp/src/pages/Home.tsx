import React, { useState, useEffect } from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Post } from "../models/Post";
import { Visibility } from "../models/Visibility";
import { UIButton } from "../components/ui/UIButton";
import { postWithTokenAsync } from "../services/api";
import { Posts } from "../components/Posts";
import { UITextarea } from "../components/ui/UITextarea";
import { UITextInput } from "../components/ui/UITextInput";
import css from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "../components/Container";
import { Dropdown, SubMenuItem } from "../components/Dropdown";
import { visibilityIconMap } from "../helpers/visibilityIconMap";

export function Home(_: any) {
    const dispatch = useDispatch();
    const store = useStore();

    const [timeline, setTimeline] = useState([] as Post[]);
    const [updatingState, setUpdatingState] = useState("fetching" as "fetching" | "error" | "success");
    const [visibility, setVisibility] = useState("public" as Visibility);
    const [disabled, setDisabled] = useState(false);
    const [isVCVisible, setIsVCVisible] = useState(false);

    const genMenuItem = (v: Visibility, name: string, description?: string) =>
        ({ name, description, icon: visibilityIconMap[v], isSelected: v === visibility, onClick: () => setVisibility(v) });

    const vcMenuItems: SubMenuItem[][] = [[
        genMenuItem("public", "公開"),
        genMenuItem("followers", "フォロワー限定", "フォロワーのみ"),
        genMenuItem("direct", "ダイレクト", "メンションされたユーザーのみ"),
    ]];

    useEffect(() => { updateTimeline(); }, [store.user!.id]);

    const updateTimeline = async () => {
        setUpdatingState("fetching");
        try {
            const posts = await postWithTokenAsync<Post[]>("/my/timeline")
            setTimeline(posts);
            setUpdatingState("success");
        } catch (e) {
            setUpdatingState("error");
        }
    };

    const post = async () => {
        setDisabled(true);
        const content: any = store.editorUseCw ? {
            cw: store.editorCw || "",
            text: store.editorText || "",
        } : {
                text: store.editorText || "",
            };
        content.visibility = visibility;
        try {
            await postWithTokenAsync("posts/create", content);
            await updateTimeline();
            dispatch(mod.actions.writeText(""));
        } catch (e) {
            window.alert(e.message || "エラー");
        } finally {
            setDisabled(false);
        }
    };


    return (
        <Container>
            <div className={css.postForm}>
                {
                    store.editorUseCw
                        ? <UITextInput disabled={disabled} type="text" placeholder="注釈があれば(オプション)" value={store.editorCw} onChange={ev => dispatch(mod.actions.writeCw(ev.target.value))} />
                        : null
                }
                <UITextarea disabled={disabled} value={store.editorText} onChange={ev => dispatch(mod.actions.writeText(ev.target.value))} placeholder="何を話そうか？" />
                <div className={css.command}>
                    <UIButton onClick={() => dispatch(mod.actions.switchCw(!store.editorUseCw))}>
                        <FontAwesomeIcon icon={store.editorUseCw ? "eye" : "eye-slash"} />
                    </UIButton>
                    <UIButton style={{ position: "relative" }} onClick={() => setIsVCVisible(!isVCVisible)}>
                        <FontAwesomeIcon icon={visibilityIconMap[visibility]} />
                        <Dropdown isActive={isVCVisible} items={vcMenuItems} />
                    </UIButton>
                    <div className={css.right}>
                        {store.editorText ? 1000 - store.editorText.length : 1000}&emsp;
                            <UIButton disabled={disabled || !store.editorText || store.editorText.length < 1 || store.editorText.length > 1000} onClick={post}>
                            <FontAwesomeIcon icon="paper-plane" /> &ensp;
                                {disabled ? "投稿中..." : "投稿する"}
                        </UIButton>
                    </div>
                </div>
            </div>
            <article>
                <Posts posts={timeline} placeholder={updatingState === "error" ? "問題が発生しました" : updatingState === "fetching" ? "取得中..." : "ユーザーをフォローしたり、あなたが投稿したりすると、ここにあなたやフォローしたユーザーの投稿が表示されます。"} />
            </article>
        </Container>
    );
}