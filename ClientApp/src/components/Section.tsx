import React, { HTMLAttributes } from "react";
import css from "./Container.module.scss";

export function Section(props: HTMLAttributes<HTMLElement> & { children?: any }) {
    return <section className={css.section} {...props}>{props.children}</section>;
}