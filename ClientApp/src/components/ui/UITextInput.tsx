import React, { InputHTMLAttributes } from "react";
import css from "./UI.module.scss";

export function UITextInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input type="text" {...props} className={css.textInput} />
    );
}
