/* eslint-disable no-console */
import firebase from 'firebase';
import { providerTwitter, providerGoogle } from 'index';
import { useMemo, useState } from 'react';
import { loginSuccess } from 'reduxes/modules/accounts/login';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';


const useLogin = () => {
  const [isLoaggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>();
  const { location } = useReactRouter();
  const dispatch = useDispatch();
  const [historyItems, setHistoryItems] = useState<any>();

  useMemo(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        dispatch(loginSuccess({}));
        setIsLoggedIn(true);
        setUserId(user.uid);
        if (location.pathname === '/histories') {
          (async () => {
            const db = firebase.firestore();
            const historyDoc = await db.collection('historyList').doc(user.uid).get();
            const historyData = historyDoc.data();
            const historyItem = historyData ? historyData.item : [];
            setHistoryItems(historyItem);
          })();
        }
        setIsLoading(false);
        return;
      }
      setUserId(undefined);
      setIsLoading(false);
    });
  }, [dispatch, location.pathname]);

  const loginWithGoogle = async () => {
    firebase.auth().signInWithRedirect(providerGoogle);
  };

  const loginWithTwitter = () => {
    firebase.auth().signInWithRedirect(providerTwitter);
  };

  const signOut = () => {
    firebase.auth().signOut();
    setIsLoggedIn(false);
  };

  return {
    isLoaggedIn,
    isLoading,
    loginWithTwitter,
    loginWithGoogle,
    userId,
    signOut,
    historyItems,
  };
};

export default useLogin;
