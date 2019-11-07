import React, { useState } from "react";
import { toAcctString } from "../helpers/toAcctString";
import { Post as ACPost } from "../models/Post";
import css from "./Post.module.scss";
import moment from 'moment';
import 'moment/locale/ja';
import { UIButton } from "./ui/UIButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, SubMenuItem } from "./Dropdown";
moment.locale("ja");

export type PostState = {
    cwOpened: boolean,
}

export function Post(props: { post: ACPost }) {
    const p = props.post;
    const acct = toAcctString(p.user);
    const [state, setState] = useState<PostState>({
        cwOpened: false,
    });
    const [more, setMore] = useState(false);

    const moreItems: SubMenuItem[][] = [[
        { name: "投稿をコピー" },
        { name: "リンクをコピー" },
    ]];

    return (
        <article className={css.AcPost}>
            <header>
                <div className={css.name}>{p.user.profileName || p.user.name}</div>
                <div className={css.acct}>{acct}</div>
                <div className={css.time}>{moment(p.createdAt).fromNow()}</div>
            </header>
            <main>
                {
                    p.cw !== null ? (
                        <div>
                            <div>
                                {p.cw}
                                <button className={css.cwButton} onClick={() => setState(prev => ({ cwOpened: !prev.cwOpened }))}>
                                    {state.cwOpened ? "隠す" : "見る"}
                                </button>
                            </div>
                            {state.cwOpened ? p.text : null}
                        </div>
                    ) : <div>{p.text}</div>
                }
            </main>
            <footer>
                <UIButton inline static onClick={() => alert("未実装")}><FontAwesomeIcon icon="reply" /></UIButton>
                <UIButton inline static onClick={() => alert("未実装")}><FontAwesomeIcon icon="retweet" /></UIButton>
                <UIButton inline static onClick={() => alert("未実装")}><FontAwesomeIcon icon="thumbs-up" /></UIButton>
                <UIButton inline static onClick={() => setMore(!more)}><FontAwesomeIcon icon="ellipsis-h" />
                    <Dropdown isActive={more} items={moreItems} align="right" onDismissed={() => setMore(false)} />
                </UIButton>
            </footer>
        </article>
    );
}