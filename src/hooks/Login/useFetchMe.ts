/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
import useReactRouter from 'use-react-router';
import { fetchMe } from 'reduxes/modules/accounts/login';
import { useDispatch } from 'react-redux';


const useFetch = () => {
  const [isLoaggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uid] = useState<string>();
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (history.location.pathname !== '/login') {
          await dispatch(fetchMe());
        }
      } catch {
        history.push({
          pathname: '/login',
        });
      }
    })();
  }, [history, dispatch]);


  return {
    isLoaggedIn,
    isLoading,
    uid,
  };
};

export default useFetch;
