/* eslint-disable no-console */
import firebase from 'firebase';
import { providerTwitter, providerGoogle } from 'index';
import {
  useState, useEffect,
} from 'react';
import useReactRouter from 'use-react-router';
import { signIn } from 'reduxes/modules/accounts/login';
import { useDispatch } from 'react-redux';


const useLogin = () => {
  const [isLoaggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string>();
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const firebaseToken = await user.getIdToken();
            await dispatch(signIn(firebaseToken));
            setUid(user.uid);
            setIsLoading(false);
            history.push({
              pathname: '/home',
            });
          } catch {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      });
    })();
  }, [history, dispatch]);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    firebase.auth().signInWithPopup(providerGoogle);
  };

  const loginWithTwitter = async () => {
    setIsLoading(true);
    firebase.auth().signInWithPopup(providerTwitter);
  };

  const signOut = () => {
    firebase.auth().signOut();
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  return {
    isLoaggedIn,
    isLoading,
    loginWithTwitter,
    loginWithGoogle,
    uid,
    signOut,
  };
};

export default useLogin;
