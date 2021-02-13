import { PostListResponseDto } from 'entity/responseDto/postListResponseDto';
import client from 'utilities/apiClient';

export const fetchPostList = async (page: number, per: number): Promise<PostListResponseDto> => {
  const res = await client.get(`/api/search_for_app?page=${page}&per=${per}&order=0&game=[]&category=[]&word=`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
