import React, { ButtonHTMLAttributes } from "react";
import css from "./UI.module.scss";

export function UIButton(props: ButtonHTMLAttributes<HTMLButtonElement> & { children?: any, link?: boolean, inline?: boolean }) {
    return (
        <button{...props} className={props.link ? css.link : css.button} style={{ display: props.inline ? "inline-flex" : "flex" }}>{props.children}</button>
    );
}