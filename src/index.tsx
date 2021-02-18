import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from 'reduxes';
import reactDom from 'react-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';
import BottomFooter from 'components/BottomFooter';
import Top from 'pages/Top';
import Header from 'components/Header';
import { StylesProvider } from '@material-ui/styles';
import useFetch from 'hooks/Login/useFetchMe';
import Home from 'pages/Home';
import Help from 'pages/Help';
import Search from 'pages/Search';
import Information from 'pages/Info';
import Post from 'pages/Post';
import { MyPage } from 'pages/MyPage';
import { CreatePost } from 'pages/CreatePost';
import * as serviceWorker from './serviceWorker';

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

const App = () => {
  useFetch();
  React.useEffect(() => {
    if (document.domain !== 'yy-tube.com' && document.domain !== 'localhost') {
      window.location.href = `https://yy-tube.com${window.location.pathname}`;
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Top} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/info" component={Information} />
      <Redirect from="/_post/:id" to="/post/:id" />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/create" component={CreatePost} />
    </Switch>
  );
};

export const Ytube = () => (
  <Provider store={store}>
    <Router>
      <StylesProvider injectFirst>
        <Header />
        <App />
      </StylesProvider>
    </Router>
  </Provider>
);

// React entry point.
reactDom.render(
  <>
    <Ytube />
  </>,
  document.getElementById('root')
);
serviceWorker.unregister();
serviceWorker.register();
