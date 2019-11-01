import React from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";

export function Home(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    return (
        <div>
            <p>おかえりなさい、{store.user!.name}。</p>
            <button onClick={() => dispatch(mod.actions.resetToken())}>ログアウト</button>
        </div>
    );
}