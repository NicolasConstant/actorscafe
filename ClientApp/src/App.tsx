import React, { Component } from "react";
import { Route } from "react-router";

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

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Index} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/settings" component={Setting} />
        <Route exact path="/tos" component={ToS} />
        <Route exact path="/directory" component={UserDirectory} />
        <Route exact path="/@:name" component={UsersIndex} />
        <Route exact path="/@:name/following" component={UsersFollowing} />
        <Route exact path="/@:name/followers" component={UsersFollowers} />
      </Layout>
    );
  }
}
