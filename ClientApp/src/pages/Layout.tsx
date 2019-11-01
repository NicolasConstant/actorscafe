import React, { Component, Fragment } from 'react';
import { useStore } from '../store/module';
import { Link } from 'react-router-dom';

export function Layout (props: any) {
  const store = useStore();
  return (
    <div>
      <header>
        <h1>ActorsCafé</h1>
        <div className="menu">
          <Link to="/">ホーム</Link>
          {store.user ? (
            <Fragment>
              <Link to="/notifications">通知</Link>
              <Link to={`/@${store.user.name}`}>プロフィール</Link>
              <Link to="/settings">設定</Link>
            </Fragment>
          ) : null}
          <Link to="/directory">ディレクトリ</Link>
        </div>
        <hr />
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        Powered by <a href="https://github.com/xeltica/actorscafe">ActorsCafé</a>
      </footer>
    </div>
  );
}