import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/AuthContext';

import './sass/styles.sass';

import store from './redux/store';

ReactDOM.render(
  <Router>
    <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </AuthProvider>
  </Router>,
  document.getElementById('root'),
);
