import React from 'react';
import { useStore } from '../store/module';
import { Home } from './Home';
import { Welcome } from './Welcome';

export function Index(_: { }) {
  const store = useStore();
  return (store.token && store.user ? <Home /> : <Welcome />);
}
