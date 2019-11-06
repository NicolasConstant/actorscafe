import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import css from "./Dropdown.module.scss";

export type SubMenuItem = {
    name?: string;
    description?: string;
    icon?: IconProp;
    onClick?: () => void;
    isDisabled?: boolean;
    isSelected?: boolean;
};

export function Dropdown(props: { isActive: boolean, items: SubMenuItem[][], align?: "left" | "right" }) {
    return (
        <CSSTransition
            in={props.isActive}
            timeout={500}
            classNames={{
                enter: css.subMenuEnter,
                enterActive: css.subMenuEnterActive,
                exit: css.subMenuExit,
                exitActive: css.subMenuExitActive,
            }}
            unmountOnExit>
            <div className={css.subMenu} style={props.align === "right" ? { right: 0 } : { left: 0 }}>{
                props.items.map(list =>
                    <ul>{
                        list.map(item =>
                            <li onClick={item.onClick} className={item.isSelected ? css.selected : item.isDisabled ? css.disabled : undefined}>
                                {item.icon ?
                                    <div className={css.icon}>
                                        <FontAwesomeIcon icon={item.icon} size="xs" />
                                    </div>
                                    : null}
                                <div className={css.text}>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        )
                    }</ul>
                )
            }</div>
        </CSSTransition>
    );
}