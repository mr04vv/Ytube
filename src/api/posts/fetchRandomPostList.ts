import { PostListResponseDto } from 'entity/responseDto/postListResponseDto';
import client from 'utilities/apiClient';

export const fetchRandomPostList = async (): Promise<PostListResponseDto> => {
  const res = await client.get('/api/random').catch((err: any) => {
    throw err;
  });
  return res.data;
};
