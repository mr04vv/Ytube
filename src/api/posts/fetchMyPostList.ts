import { PostListResponseDto } from 'entity/responseDto/postListResponseDto';
import client from 'utilities/apiClient';

export const fetchMyPostList = async (page: number, per: number): Promise<PostListResponseDto> => {
  const res = await client.get(`/api/my_posts?page=${page}&per=${per}`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
