import React, { useEffect, useState } from 'react';
import { getMetaAsync } from '../services/api';
import { useStore } from '../store/module';
import { Menu } from '../components/Menu';
import css from "./Layout.module.scss";

export function Layout(props: any) {
  const store = useStore();
  const [state, setState] = useState({
    version: ""
  });

  useEffect(() => {
    (async () => {
      const meta = (await getMetaAsync());
      setState(p => ({ ...p, version: `${meta.version} (${meta.codeName})` }));
    })();
  }, [null]);

  return (
    <div className={css.layout}>
      <Menu user={store.user} />
      <main>
        {props.children}
      </main>
      <footer className={css.footer}>
        Powered by <a href="https://github.com/xeltica/actorscafe">ActorsCafé</a> {state.version}
      </footer>
    </div>
  );
}