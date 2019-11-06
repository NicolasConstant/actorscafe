import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { User } from "../models/User";
import css from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CSSTransition } from "react-transition-group";

function MenuItem(props: { to: string, text?: string, icon?: IconProp }) {
    const isActive = useLocation().pathname === props.to;
    return (
        <Link to={props.to} className={isActive ? css.menuItemActive : css.menuItem}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} fixedWidth={true} /> : null}
            <p className={css.title}>{props.text}</p>
        </Link>
    );
}

function MenuItemWithSubMenu(props: { text?: string, icon?: IconProp, subMenuItems?: SubMenuItem[][] }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <a className={css.menuItem} onClick={() => setIsActive(!isActive)}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} fixedWidth={true} /> : null}
            <p className={css.title}>{props.text}&nbsp;</p>
            <FontAwesomeIcon icon="angle-down" />
            <CSSTransition
                in={isActive}
                timeout={500}
                classNames={{
                    enter: css.subMenuEnter,
                    enterActive: css.subMenuEnterActive,
                    exit: css.subMenuExit,
                    exitActive: css.subMenuExitActive,
                }}
                unmountOnExit>
                <div className={css.subMenu}>
                    {props.subMenuItems ?
                        props.subMenuItems.map(list =>
                            <ul>
                                {
                                    list.map(item =>
                                        <li onClick={item.onClick} className={item.isDisabled ? css.disabled : undefined}>
                                            {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}&nbsp;
                                            {item.name}
                                        </li>
                                    )
                                }
                            </ul>
                        ) : <p>内容はないよ</p>
                    }
                </div>
            </CSSTransition>
        </a>
    );
}

type SubMenuItem = {
    name?: string;
    icon?: IconProp;
    onClick?: () => void;
    isDisabled?: boolean;
};

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
                {profileMenu ? <MenuItemWithSubMenu text={u!.name} subMenuItems={profileMenu} /> : null}
            </div>
        </header>
    );
}