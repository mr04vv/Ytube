/* eslint-disable no-alert */
/* eslint-disable no-console */
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from 'reduxes';
import reactDom from 'react-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';
import BottomFooter from 'components/BottomFooter';
import Top from 'pages/Top';
import Header from 'components/Header';
import { StylesProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();

const firebaseConfig = {
  apiKey: 'AIzaSyAMflWWyJGIjb_1AS6OnrIBKuQcm-ZpwlI',
  authDomain: 'tapitapi-f601b.firebaseapp.com',
  databaseURL: 'https://tapitapi-f601b.firebaseio.com',
  projectId: 'tapitapi-f601b',
  storageBucket: '',
  messagingSenderId: '779676974115',
  appId: '1:779676974115:web:64b3250346ff2c64',
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const store = configureStore();

const App = () => (
  <Switch>
    <Route exact path="/" component={Top} />
  </Switch>
);

// React entry point.
reactDom.render(
  <Provider store={store}>
    <Router>
      <StylesProvider injectFirst>
        <Header />
        <App />
        <BottomFooter />
      </StylesProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
