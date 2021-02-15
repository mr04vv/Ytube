import { RouteComponentProps } from 'react-router';
import useReactRouter from 'use-react-router';


export const useEnhancer = () => {
  const { history }: RouteComponentProps<{id: string}> = useReactRouter();
  const pushLogin = () => {
    history.push({
      pathname: '/login',
    });
  };

  return {
    pushLogin
  };
};
