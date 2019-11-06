import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store-api';
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './App';
import { registerIcons } from "./registerIcons";
registerIcons();

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter basename={baseUrl}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  rootElement);

registerServiceWorker();

