import React, { Component } from 'react';
import { useStore } from '../store/module';

export function Layout (props: any) {
  const store = useStore();
  return (
    <div>
        <h1>ActorsCafé</h1>
        {store.token ? <div>
          
        </div> : null}
        {props.children}
    </div>
  );
}