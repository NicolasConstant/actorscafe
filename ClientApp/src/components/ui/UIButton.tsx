import React, { ButtonHTMLAttributes } from "react";
import css from "./UI.module.scss";

export function UIButton(props: ButtonHTMLAttributes<HTMLButtonElement> & { children?: any, link?: boolean, inline?: boolean, static?: boolean }) {
    return (
        <button{...props} className={props.link ? css.link : props.static ? css.static : css.button} style={{ ...props.style, display: props.inline ? "inline-flex" : "flex" }}>{props.children}</button>
    );
}