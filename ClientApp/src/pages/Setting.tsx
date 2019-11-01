import React from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export function Setting(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    return (
        <div>
            <h1>設定</h1>
            <ul>
                <li><Link to="/" onClick={() => dispatch(mod.actions.resetToken())}>ログアウトする</Link></li>
            </ul>
        </div>
    );
}