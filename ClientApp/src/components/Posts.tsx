import { Post } from "../models/Post";
import { Post as VmPost } from "./Post";
import React from "react";

export function Posts(props: { posts: Post[], placeholder: string }) {
    return (
        <article>
            { props.posts.length > 0 ? props.posts.map(p => <VmPost key={p.id} post={p}/>) : <p>{props.placeholder}</p> }
        </article>
    );
}