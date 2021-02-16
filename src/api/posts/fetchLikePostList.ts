import { LikePostListResponseDto } from 'entity/responseDto/likePostListResponseDto';
import client from 'utilities/apiClient';

export const fetchLikePostList = async (page: number, per: number): Promise<LikePostListResponseDto> => {
  const res = await client.get(`/api/likes_for_app?page=${page}&per=${per}`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
