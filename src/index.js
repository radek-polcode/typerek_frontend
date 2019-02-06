import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { LoadingView } from './_components/'
import 'bootstrap/dist/css/bootstrap.min.css';

import { persistor, store } from './_helpers';
import { App } from './App';

import './index.css';
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <PersistGate 
      loading={<LoadingView />}
      persistor={persistor}
    > 
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
