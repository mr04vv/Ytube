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
  apiKey: 'AIzaSyBd6qvPBAcBO7zPEG5leDFQVzZL6gYnqhw',
  authDomain: 'ytube-938fd.firebaseapp.com',
  databaseURL: 'https://ytube-938fd.firebaseio.com',
  projectId: 'ytube-938fd',
  storageBucket: '',
  messagingSenderId: '786349780781',
  appId: '1:786349780781:web:2986137e904ca815046da4',
  measurementId: 'G-000EQW30EY',
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
