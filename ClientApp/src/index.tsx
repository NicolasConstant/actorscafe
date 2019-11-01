import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const rootElement = document.getElementById('root');

const { store, persistor } = setupStore();

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

