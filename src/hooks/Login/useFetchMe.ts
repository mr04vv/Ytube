/* eslint-disable no-console */
import {
  useState, useEffect,
} from 'react';
import useReactRouter from 'use-react-router';
import { fetchMe } from 'reduxes/modules/accounts/login';
import { useDispatch } from 'react-redux';

const useFetch = () => {
  const [isLoaggedIn] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(true);
  const [uid] = useState<string>();
  const { history } = useReactRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (history.location.pathname !== '/login') {
        await dispatch(fetchMe());
      }
      if (history.location.pathname !== '/') {
        history.push({
          pathname: '/home',
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
