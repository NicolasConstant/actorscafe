import React, { useEffect } from "react";
import { Route } from "react-router";
import "sanitize.css";

import { Layout } from "./pages/Layout";
import { Index } from "./pages/Index";
import { UsersIndex } from "./pages/Users/Index";
import { UsersFollowing } from "./pages/Users/Following";
import { UsersFollowers } from "./pages/Users/Followers";
import { Notifications } from "./pages/Notifications";
import { Setting } from "./pages/Setting";
import { UserDirectory } from "./pages/Users/Directory";
import { ToS } from "./pages/ToS";
import { Posts } from "./pages/Posts";
import { useStore, mod } from "./store/module";
import { useDispatch } from "react-redux";
import { postAsync } from "./services/api";
import { User } from "./models/User";

const route = [
  { path: "/", Component: Index },
  { path: "/notifications", Component: Notifications },
  { path: "/settings", Component: Setting },
  { path: "/tos", Component: ToS },
  { path: "/directory", Component: UserDirectory },
  { path: "/@:name", Component: UsersIndex },
  { path: "/@:name/following", Component: UsersFollowing },
  { path: "/@:name/followers", Component: UsersFollowers },
  { path: "/posts/:id", Component: Posts },
];

export function App() {
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    if (store.token) {
      postAsync<User>("me")
        .then(u => dispatch(mod.actions.setUser(u)));
    }
  }, [store.token]);

  return (
    <Layout>{
      route.map(({ path, Component }) => (
        <Route key={path} exact path={path} component={Component} />
      ))
    }</Layout>
  );
};