import React, { Component } from "react";
import { Route } from "react-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRetweet, faHeart, faSmile, faPlus, faMinus, faEllipsisH, faBell, faAddressBook, faReply, faReplyAll, faGlobe, faLock, faEnvelope, faCog, faSignOutAlt, faEye, faEyeSlash, faHome, faCoffee, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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

library.add(
  faRetweet,
  faHeart,
  faSmile,
  faPlus,
  faMinus,
  faEllipsisH,
  faBell,
  faAddressBook,
  faReply,
  faReplyAll,
  faGlobe,
  faLock,
  faEnvelope,
  faCog,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faHome,
  faCoffee,
  faPaperPlane,
);

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
