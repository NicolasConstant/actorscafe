import React from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";

export function Home(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    return (
        <div>
            <h1>ホーム</h1>
            <p>おかえりなさい、{store.user!.name} さん。</p>
            <p>ここにタイムラインが表示される予定</p>
        </div>
    );
}