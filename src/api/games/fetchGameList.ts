import { Game } from 'entity/entity/game';
import client from 'utilities/apiClient';

export const fetchGameList = async (): Promise<Game[]> => {
  const res = await client.get('api/games').catch((err: any) => {
    throw err;
  });
  return res.data;
};
