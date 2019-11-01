import React, { Component } from 'react';
import { useStore } from '../store/module';
import { Link } from 'react-router-dom';

export function Layout (props: any) {
  const store = useStore();
  return (
    <div>
        <h1>ActorsCafé</h1>
        {store.user ? <div>
          <Link to="/">ホーム</Link>・
          <Link to="/notifications">通知</Link>・
          <Link to={`/@${store.user.name}`}>プロフィール</Link>・
          <Link to="/settings">設定</Link>
        </div> : null}
        <hr />
        {props.children}
    </div>
  );
}