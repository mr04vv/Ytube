import { PostListResponseDto } from 'entity/responseDto/postListResponseDto';
import client from 'utilities/apiClient';

export const searchPostList = async (page: number, per: number, game: number[], category: number[], order: number, word: string): Promise<PostListResponseDto> => {
  const res = await client.get(`/api/search_for_app?page=${page}&per=${per}&order=${order}&game=[${game.toString()}]&category=[${category.toString()}]&word=${word}`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
