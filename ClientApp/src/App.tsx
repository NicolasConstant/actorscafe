import React, { Component } from "react";
import { Route } from "react-router";
import { CSSTransition } from "react-transition-group";

import { Layout } from "./pages/Layout";
import { Index } from "./pages/Index";
import { UsersIndex } from "./pages/Users/Index";
import { UsersFollowing } from "./pages/Users/Following";
import { UsersFollowers } from "./pages/Users/Followers";
import { Notifications } from "./pages/Notifications";
import { Setting } from "./pages/Setting";
import { UserDirectory } from "./pages/Users/Directory";
import { ToS } from "./pages/ToS";

import "sanitize.css";

const route = [
  { path: "/", Component: Index },
  { path: "/notifications", Component: Notifications },
  { path: "/settings", Component: Setting },
  { path: "/tos", Component: ToS },
  { path: "/directory", Component: UserDirectory },
  { path: "/@:name", Component: UsersIndex },
  { path: "/@:name/following", Component: UsersFollowing },
  { path: "/@:name/followers", Component: UsersFollowers },
];

export function App() {
  return (
    <Layout>{
      route.map(({ path, Component }) => (
        <Route key={path} exact path={path} component={Component} />
      ))
    }</Layout>
  );
};