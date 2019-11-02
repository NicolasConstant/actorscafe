import React, { useState, useEffect } from 'react';
import { useStore } from '../store/module';
import { getMetaAsync } from '../services/api';
import marked from "marked";

export function ToS(_: { }) {
  const store = useStore();
  const [ state, setState ] = useState<string>("");
  useEffect(() => {
    (async () => {
      setState((await getMetaAsync()).termsOfService || "<p>利用規約はありません。</p>");
    })();
  }, [null]);
  return (
    <div dangerouslySetInnerHTML={{__html: marked(state)}} />
  );
}
