import Axios, { AxiosError } from "axios";
import { User } from "../models/User";
import { ApiError } from "./ApiError";

export const apiUrl = `https://${window.location.host}/api`;

export const apiClient = Axios.create({
    baseURL: apiUrl,
    responseType: "json",
    // エラーのときにエラーオブジェクトをスローするようにしたいので axios に例外は出させない
    validateStatus: _ => true,
});

export const postAsync = async <T = any>(endPoint: string, content: any = {}) => {
    const res = await apiClient.post(endPoint, content);

    if (res.status < 400) {
        // エラーがなければデータを返す
        return res.data as T;
    } else {
        // エラーの場合 コンソールエラーおよび ApiError スロー
        console.error(`API ${endPoint} returned error: ${res.status} ${res.data.message}`);
        if (res.data.stackTrace)
            console.error(res.data.stackTrace);
        throw new ApiError(res.data.message);
    }
};

export const signInAsync = (userName: string, password: string) => postAsync<SignInResponse>("signin", { userName, password });
export const signUpAsync = (userName: string, password: string) => postAsync<SignInResponse>("signup", { userName, password });

export type SignInResponse = {
    token: string;
    user: User;
};

