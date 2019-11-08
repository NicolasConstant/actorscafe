import React, { HTMLAttributes } from "react";
import css from "./Container.module.scss";

export function Card(props: HTMLAttributes<HTMLElement> & { children?: any }) {
    return <section className={css.card} {...props}>{props.children}</section>;
}