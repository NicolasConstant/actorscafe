import React, { HTMLAttributes } from "react";
import css from "./Container.module.scss";

export function Container(props: HTMLAttributes<HTMLDivElement> & { children?: any }) {
    return <div className={css.container} {...props}>{props.children}</div>;
}