import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { User } from "../models/User";
import css from "./Menu.module.scss";
import { Dropdown, SubMenuItem } from "./Dropdown";

function MenuItem(props: { to: string, text?: string, icon?: IconProp }) {
    const isActive = useLocation().pathname === props.to;
    return (
        <Link to={props.to} className={isActive ? css.menuItemActive : css.menuItem}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} fixedWidth={true} /> : null}
            <p className={css.title}>{props.text}</p>
        </Link>
    );
}

function MenuItemWithSubMenu(props: { text?: string, icon?: IconProp, subMenuItems: SubMenuItem[][], align?: "left" | "right" }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <a className={css.menuItem} onClick={() => setIsActive(!isActive)}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} size="2x" fixedWidth={true} /> : null}
            <p className={css.title}>{props.text}&nbsp;</p>
            <FontAwesomeIcon icon="angle-down" />
            <Dropdown isActive={isActive} items={props.subMenuItems} align={props.align} onDismissed={() => setIsActive(false)} />
        </a>
    );
}

export function Menu(props: { user?: User }) {
    const history = useHistory();
    const u = props.user;
    const profileMenu: SubMenuItem[][] | null = u ? [
        [
            {
                name: "プロフィール",
                icon: "user",
                onClick: () => history.push(`/@${u.name}`),
            },
            {
                name: "リスト(coming soon)",
                icon: "list",
                isDisabled: true,
            },
            {
                name: "ブックマーク(coming soon)",
                icon: "bookmark",
                isDisabled: true,
            },
        ],
        [
            {
                name: "利用規約",
                onClick: () => history.push(`/tos`),
            },
            {
                name: "設定",
                icon: "cog",
                onClick: () => history.push(`/settings`),
            },
        ],
    ] : null;

    return (
        <header className={css.menu}>
            <div className={css.left}>
                <MenuItem to="/" text="ホーム" icon="home" />
                <MenuItem to="/notifications" text="通知" icon="bell" />
                <MenuItem to="/directory" text="ディレクトリ" icon="address-book" />
            </div>
            <div className={css.middle}>
                <FontAwesomeIcon icon="coffee" size="lg" />
            </div>
            <div className={css.right}>
                {profileMenu ? <MenuItemWithSubMenu text={u!.name} subMenuItems={profileMenu} icon="user-circle" align="right" /> : null}
            </div>
        </header>
    );
}