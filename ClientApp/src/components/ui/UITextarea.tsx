import React, { TextareaHTMLAttributes } from "react";
import css from "./UI.module.scss";

export function UITextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { children?: any }) {
    return (
        <textarea{...props} className={css.textarea}>{props.children}</textarea>
    );
}