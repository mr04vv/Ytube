import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from 'reduxes';
import reactDom from 'react-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Header from 'components/Header';
import { StylesProvider } from '@material-ui/styles';
import Home from 'pages/Home';
import Search from 'pages/Search';
import Post from 'pages/Post';
import { MyPage } from 'pages/MyPage';
import { CreatePost } from 'pages/CreatePost';
import { EditPost } from 'pages/EditPost';
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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const store = configureStore();

const App = () => {
  React.useEffect(() => {
    if (document.domain !== 'yy-tube.com' && document.domain !== 'localhost') {
      window.location.href = `https://yy-tube.com${window.location.pathname}`;
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/search" component={Search} />
      <Redirect from="/_post/:id" to="/post/:id" />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/create" component={CreatePost} />
      <Route exact path="/edit/:id" component={EditPost} />
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
