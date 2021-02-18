import firebase from 'firebase';
import { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { signIn } from 'reduxes/modules/accounts/login';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerTwitter = new firebase.auth.TwitterAuthProvider();

interface Props {
  setIsOpen: (v: boolean) => void;
}

export const useEnhancer = ({ setIsOpen }: Props) => {
  const [isLoaggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string>();
  const dispatch = useDispatch();
  const { history }: RouteComponentProps<{id: string}> = useReactRouter();

  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged(async (user: any) => {
        if (user) {
          try {
            const firebaseToken = await user.getIdToken();
            await dispatch(signIn(firebaseToken));
            setUid(user.uid);
            setIsLoading(false);
            setIsOpen(false);
          } catch {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      });
    })();
  }, [history, dispatch, setIsOpen]);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    firebase.auth().signInWithPopup(providerGoogle);
  };

  const loginWithTwitter = async () => {
    setIsLoading(true);
    firebase.auth().signInWithPopup(providerTwitter);
  };

  const signOut = () => {
    dispatch(signOut());
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
