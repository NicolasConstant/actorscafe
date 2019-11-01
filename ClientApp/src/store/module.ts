import { createSlice } from "redux-starter-kit";
import { User } from "../models/User";
import { postAsync } from "../services/api";
import { useSelector } from "react-redux";

export type State = {
    token?: string,
    user?: User,
}

export const mod = createSlice({
    name: "actorscafe",
    initialState: {} as State,
    reducers: {
        setToken(state, {payload}) {
            state.token = payload.token;
            state.user = payload.user;
        },
        resetToken(state) {
            state.token = undefined;
            state.user = undefined;
        },
    }
});

export const useStore = () => {
    return useSelector((state: ReturnType<typeof mod.reducer>) => state);
};