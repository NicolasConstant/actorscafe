import React, { useState } from "react";
import { toAcctString } from "../helpers/toAcctString";
import { Post as ACPost } from "../models/Post";
import css from "./Post.module.scss";
import moment from 'moment';
import 'moment/locale/ja';
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
        </article>
    );
}