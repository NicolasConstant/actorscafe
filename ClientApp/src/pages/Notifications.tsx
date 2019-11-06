import React from "react";
import { useStore, mod } from "../store/module";
import { useDispatch } from "react-redux";
import { Container } from "../components/Container";

export function Notifications(_: any) {
    const dispatch = useDispatch();
    const store = useStore();
    return (
        <Container>
            <h1>通知</h1>
            <p>ここに通知が表示される予定</p>
        </Container>
    );
}