import React, { useState, useEffect } from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Post } from "../models/Post";
import { UIButton } from "../components/ui/UIButton";
import { postWithTokenAsync } from "../services/api";
import { Posts } from "../components/Posts";
import { UITextarea } from "../components/ui/UITextarea";
import { UITextInput } from "../components/ui/UITextInput";
import css from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type HomeState = {
    timeline: Post[],
    timelineState: "fetching" | "error" | "success",
    disabled: boolean
};

export function Home(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    const [state, setState] = useState<HomeState>({ timeline: [], disabled: false, timelineState: "fetching" });

    useEffect(() => { updateTimeline(); }, [store.user!.id]);

    const updateTimeline = async () => {
        setState(prev => ({ ...prev, timeline: [], timelineState: "fetching" }));
        try {
            const posts = await postWithTokenAsync<Post[]>("/my/timeline")
            setState(prev => ({ ...prev, timeline: posts, timelineState: "success" }));
        } catch (e) {
            setState(prev => ({ ...prev, timelineState: "error" }));
        }
    };

    const post = async () => {
        setState(prev => ({ ...prev, disabled: true, }));
        const content = store.editorUseCw ? {
            cw: store.editorCw || "",
            text: store.editorText || "",
        } : {
                text: store.editorText || "",
            };
        try {
            await postWithTokenAsync("posts/create", content);
            await updateTimeline();
            dispatch(mod.actions.writeText(""));
        } catch (e) {
            window.alert(e.message || "エラー");
        } finally {
            setState(prev => ({ ...prev, disabled: false, }));
        }
    };


    return (
        <div>
            <div className={css.postForm}>
                {
                    store.editorUseCw
                        ? <UITextInput disabled={state.disabled} type="text" placeholder="注釈があれば(オプション)" value={store.editorCw} onChange={ev => dispatch(mod.actions.writeCw(ev.target.value))} />
                        : null
                }
                <UITextarea disabled={state.disabled} value={store.editorText} onChange={ev => dispatch(mod.actions.writeText(ev.target.value))} placeholder="何を話そうか？" />
                <div className={css.command}>
                    <UIButton onClick={() => dispatch(mod.actions.switchCw(!store.editorUseCw))}>
                        <FontAwesomeIcon icon={store.editorUseCw ? "eye" : "eye-slash"} />
                    </UIButton>
                    <div className={css.right}>
                        {store.editorText ? 1000 - store.editorText.length : 1000}&emsp;
                        <UIButton disabled={state.disabled || !store.editorText || store.editorText.length < 1 || store.editorText.length > 1000} onClick={post}>
                            <FontAwesomeIcon icon="paper-plane" /> &ensp;
                            {state.disabled ? "投稿中..." : "投稿する"}
                        </UIButton>
                    </div>
                </div>
            </div>
            <article>
                <UIButton disabled={state.timelineState === "fetching"} onClick={updateTimeline}>
                    {state.timelineState === "fetching" ? "更新中..." : "タイムラインを更新"}
                </UIButton>
                <Posts posts={state.timeline} placeholder={state.timelineState === "error" ? "問題が発生しました" : state.timelineState === "fetching" ? "取得中..." : "ユーザーをフォローしたり、あなたが投稿したりすると、ここにあなたやフォローしたユーザーの投稿が表示されます。"} />
            </article>
        </div>
    );
}