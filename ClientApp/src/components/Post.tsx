import React, { useState } from "react";
import { toAcctString } from "../helpers/toAcctString";
import { Post as ACPost } from "../models/Post";
import css from "../styles/post.module.scss";
import moment from 'moment';
import 'moment/locale/ja';
moment.locale("ja");

export type PostState = {
    cwOpened: boolean,
}

export function Post(props: { post: ACPost}) {
    const p = props.post;
    const acct = toAcctString(p.user);
    const [ state, setState ] = useState<PostState>({
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
                <p>
                {
                    p.cw !== null ? (<span>
                        { p.cw }
                        <button onClick={() => setState(prev => ({ cwOpened: !prev.cwOpened }))}>
                            { state.cwOpened ? "隠す" : "見る" }
                        </button>
                        { state.cwOpened ? p.text : null }
                    </span>) : p.text
                }
                </p>
            </main>
        </article>
    );
}