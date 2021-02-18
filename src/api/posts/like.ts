import { LikeRequestDto } from 'entity/requestDto/likeRequestDto';
import client from 'utilities/apiClient';

export const like = async (body: LikeRequestDto) => {
  const res = await client.post('/api/likes', body).catch((err: any) => {
    throw err;
  });
  return res;
};
