import React, { useState, useEffect } from 'react';
import { useStore } from '../store/module';
import { getMetaAsync } from '../services/api';
import marked from "marked";
import { Container } from '../components/Container';

export function ToS(_: {}) {
  const store = useStore();
  const [state, setState] = useState<string>("");
  useEffect(() => {
    (async () => {
      setState((await getMetaAsync()).termsOfService || "<p>利用規約はありません。</p>");
    })();
  }, [null]);
  return (
    <Container dangerouslySetInnerHTML={{ __html: marked(state) }} />
  );
}
