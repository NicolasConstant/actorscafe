import React, { HTMLAttributes } from "react";
import css from "./Container.module.scss";

export function Horizontal(props: HTMLAttributes<HTMLElement> & { children?: any }) {
    return <div className={css.horizontal} {...props}>{props.children}</div>;
}