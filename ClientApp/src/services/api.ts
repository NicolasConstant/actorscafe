import Axios from "axios";
import { User } from "../models/User";

export const apiUrl = `https://${window.location.host}/api`;

export const apiClient = Axios.create({
    baseURL: apiUrl,
    responseType: "json",
});

export const postAsync = <T = any>(endPoint: string, content: any) => apiClient.post<T>(endPoint, content);

export const signInAsync = (userName: string, password: string) => postAsync<SignInResponse>("signin", { userName, password });
export const signUpAsync = (userName: string, password: string) => postAsync<SignInResponse>("signup", { userName, password });

export type SignInResponse = {
    token: string;
    user: User;
};