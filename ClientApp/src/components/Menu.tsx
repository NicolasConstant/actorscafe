import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../models/User";
import css from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function MenuItem(props: { to: string, text?: string, icon?: IconProp, location?: any }) {
    const isActive = useLocation().pathname === props.to;
    return (
        <Link to={props.to} className={isActive ? css.menuItemActive : css.menuItem}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} fixedWidth={true} /> : null}
            <p className={css.title}>{props.text}</p>
        </Link>
    );
}

export function Menu(props: { user?: User }) {

    return (
        <header className={css.menu}>
            <nav className={css.left}>
                <MenuItem to="/" text="ホーム" icon="home" />
                <MenuItem to="/notifications" text="通知" icon="bell" />
                <MenuItem to="/directory" text="ディレクトリ" icon="address-book" />
            </nav>
            <div className={css.middle}>
                <FontAwesomeIcon icon="coffee" size="lg" />
            </div>
        </header>
    );
}