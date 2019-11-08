import React, { useState } from "react";
import { toAcctString } from "../helpers/toAcctString";
import { Post as ACPost } from "../models/Post";
import css from "./Post.module.scss";
import moment from 'moment';
import 'moment/locale/ja';
import { UIButton } from "./ui/UIButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, SubMenuItem } from "./Dropdown";
import { postAsync } from "../services/api";
import { useStore } from "../store/module";
import { format } from "../helpers/format";
moment.locale("ja");

export type PostState = {
    cwOpened: boolean,
}

export function Post(props: { post: ACPost }) {
    const p = props.post;
    const url = `${window.location.origin}/posts/${p.id}`;
    const store = useStore();
    const acct = toAcctString(p.user);
    const [state, setState] = useState<PostState>({
        cwOpened: false,
    });
    const [more, setMore] = useState(false);

    const moreItems: SubMenuItem[][] = [[
        {
            name: "ćç¨żăăłăăź",
            icon: "copy",
            onClick() {
                if (p.text) {
                    navigator.clipboard.writeText(p.text)
                        .then(() => alert("ăłăăźăăžăăďź"))
                        .catch(() => alert("ĺ¤ąćăăžăăďź"));
                }
            }
        },
        {
            name: "ăŞăłăŻăăłăăź",
            icon: "link",
            onClick() {
                navigator.clipboard.writeText(url)
                    .then(() => alert("ăłăăźăăžăăďź"))
                    .catch(() => alert("ĺ¤ąćăăžăăďź"));
            }
        }
    ]];

    if (store.user && (store.user.id === p.userId || store.user.isAdmin || store.user.isModerator)) {
        moreItems.push([{
            name: "ćç¨żăĺé¤",
            icon: "trash-alt",
            onClick() {
                postAsync("posts/delete", { postId: p.id })
            }
        }]);
    }

    const body = <div dangerouslySetInnerHTML={{ __html: format(p.text || "") }} />;

    return (
        <article className={css.AcPost}>
            <header>
                <div className={css.name}>{p.user.profileName || p.user.name}</div>
                <div className={css.acct}>{acct}</div>
                {p.user.isBot ? <div>đ¤</div> : null}
                {p.user.isCat ? <div>đş</div> : null}
                <a href={url} className={css.time}>{moment(p.createdAt).fromNow()}</a>
            </header>
            <main>
                {
                    p.cw !== null ? (
                        <div>
                            <div>
                                {p.cw}
                                <button className={css.cwButton} onClick={() => setState(prev => ({ cwOpened: !prev.cwOpened }))}>
                                    {state.cwOpened ? "é ă" : "čŚă"}
                                </button>
                            </div>
                            {state.cwOpened ? body : null}
                        </div>
                    ) : body
                }
            </main>
            <footer>
                <UIButton inline static onClick={() => alert("ćŞĺŽčŁ")}><FontAwesomeIcon icon="reply" /></UIButton>
                <UIButton inline static onClick={() => alert("ćŞĺŽčŁ")}><FontAwesomeIcon icon="retweet" /></UIButton>
                <UIButton inline static onClick={() => alert("ćŞĺŽčŁ")}><FontAwesomeIcon icon="thumbs-up" /></UIButton>
                <UIButton inline static onClick={() => setMore(!more)}><FontAwesomeIcon icon="ellipsis-h" />
                    <Dropdown isActive={more} items={moreItems} align="right" onDismissed={() => setMore(false)} />
                </UIButton>
            </footer>
        </article>
    );
}