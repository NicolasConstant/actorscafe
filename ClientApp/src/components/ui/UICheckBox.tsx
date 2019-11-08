import React, { InputHTMLAttributes } from "react";
import css from "./UI.module.scss";

const svgCheck = (
    <svg xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export function UICheckBox(props: InputHTMLAttributes<HTMLInputElement> & { text?: string, children?: any }) {
    return (
        <label className={css.checkBox}>
            <input {...props} children={undefined} type="checkbox" />
            <span>{props.text || props.children}</span>
        </label>
    );
}