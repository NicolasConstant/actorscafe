import React, { Fragment, useEffect, useState } from 'react';
import { useStore } from '../store/module';
import { Link } from 'react-router-dom';
import { getMetaAsync } from '../services/api';

export function Layout (props: any) {
  const store = useStore();
  const [ state, setState ] = useState({
    version: ""
  });

  useEffect(() => {
    (async () => {
      const meta = (await getMetaAsync());
      setState(p => ({ ...p, version: `${meta.version} (${meta.codeName})` }));
    })();
}, [null]);

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
          <Link to="/tos">利用規約</Link>
        </div>
        <hr />
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        Powered by <a href="https://github.com/xeltica/actorscafe">ActorsCafé</a> { state.version }
      </footer>
    </div>
  );
}