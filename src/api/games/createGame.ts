import { Game } from 'entity/entity/game';
import { CreateGameRequestDto } from 'entity/requestDto/createGameRequestDto';
import client from 'utilities/apiClient';

export const createGame = async (body: CreateGameRequestDto): Promise<Game[]> => {
  const res = await client.post('api/games', body).catch((err: any) => {
    throw err;
  });
  return res.data;
};
