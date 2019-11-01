import React, { useState, useEffect } from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Post } from "../models/Post";
import { Post as VmPost } from "../components/Post";
import { postWithTokenAsync } from "../services/api";
import { Posts } from "../components/Posts";

export type HomeState = {
    timeline: Post[],
    disabled: boolean
};

export function Home(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    const [ state, setState ] = useState<HomeState>({ timeline: [], disabled: false });

    useEffect(() => { updateTimeline(); }, [store.user!.id]);

    const updateTimeline = async () => {
        const posts = await postWithTokenAsync<Post[]>("/posts/users", {
            userId: store.user!.id,
        })
        setState(prev => ({ ...prev, timeline: posts, }));
    };

    const post = async () => {
        setState(prev => ({ ...prev, disabled: true, }));
        const content = store.editorUseCw ? {
            cw: store.editorCw || "",
            text: store.editorText || "",
        } : {
            text: store.editorText || "",
        };
        try
        {
            await postWithTokenAsync("posts/create", content);
            await updateTimeline();
            dispatch(mod.actions.writeText(""));
        } finally {
            setState(prev => ({ ...prev, disabled: false, }));
        }
    };


    return (
        <div>
            <h1>ホーム</h1>
            <div>
                {
                    store.editorUseCw 
                        ? <input disabled={ state.disabled } size={128} type="text" placeholder="注釈があれば(オプション)" value={store.editorCw} onChange={ev => dispatch(mod.actions.writeCw(ev.target.value))}/>
                        : null
                }
                <textarea disabled={ state.disabled } rows={8} cols={128} value={store.editorText} onChange={ev => dispatch(mod.actions.writeText(ev.target.value))} placeholder="何を話そうか？" />
                <label>
                    <input disabled={ state.disabled } type="checkbox" checked={store.editorUseCw} onChange={ev => dispatch(mod.actions.switchCw(ev.target.checked))} />
                    CW
                </label>
                <button disabled={ state.disabled || !store.editorText || store.editorText.length < 1 || store.editorText.length > 1000} onClick={post}>投稿</button>
                <b>{store.editorText ? 1000 - store.editorText.length : 1000}</b>
            </div>
            <article>
                <Posts posts={state.timeline} placeholder="ユーザーをフォローしたり、あなたが投稿したりすると、ここにあなたやフォローしたユーザーの投稿が表示されます。" />
            </article>
        </div>
    );
}