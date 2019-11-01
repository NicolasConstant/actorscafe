import React from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";

export function Setting(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    return (
        <div>
            <h1>設定</h1>
            <ul>
                <li><a href="#" onClick={() => dispatch(mod.actions.setToken())}>ログアウトする</a></li>
            </ul>
        </div>
    );
}