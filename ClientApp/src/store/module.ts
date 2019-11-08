import { createSlice } from "redux-starter-kit";
import { User } from "../models/User";
import { postAsync } from "../services/api";
import { useSelector } from "react-redux";

export type State = {
    token?: string,
    user?: User,
    editorText?: string,
    editorCw?: string,
    editorUseCw?: boolean,
}

export const mod = createSlice({
    name: "actorscafe",
    initialState: {} as State,
    reducers: {
        setToken(state, { payload }) {
            state.token = payload.token;
            state.user = payload.user;
        },
        setUser(state, { payload }) {
            state.user = payload;
        },
        resetToken(state) {
            state.token = undefined;
            state.user = undefined;
        },
        writeText(state, { payload }) {
            state.editorText = payload;
        },
        writeCw(state, { payload }) {
            state.editorCw = payload;
        },
        switchCw(state, { payload }) {
            state.editorUseCw = payload;
        },
    }
});

export const useStore = () => {
    return useSelector((state: ReturnType<typeof mod.reducer>) => state);
};