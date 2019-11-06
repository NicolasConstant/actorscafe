import { Post } from "../models/Post";
import { Post as VmPost } from "./Post";
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import css from "./Post.module.scss";

export function Posts(props: { posts: Post[], placeholder: string }) {
    return (
        <TransitionGroup component="article">
            {props.posts.length > 0 ? props.posts.map(p =>
                <VmPost post={p} />
            ) : <p>{props.placeholder}</p>}
        </TransitionGroup>
    );
}