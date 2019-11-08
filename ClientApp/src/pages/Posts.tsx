import React, { useEffect, useState } from 'react';
import { postAsync } from '../services/api';
import { Post } from '../models/Post';
import { Container } from '../components/Container';
import { Post as VmPost } from '../components/Post';
import { Card } from '../components/Card';

export function Posts(props: { match: any }) {
    const postId = props.match.params.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                setPost(await postAsync<Post>("posts/show", { postId }));
            } finally {
                setIsFetching(false);
            }
        })();
    }, [null]);

    return (
        <Container>{
            isFetching ? null :
                post != null ? <VmPost post={post} /> : <Card>取得に失敗しました。</Card>
        }</Container>
    );

}
