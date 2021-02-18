import client from 'utilities/apiClient';
import { CreatePostRequestDto } from 'entity/requestDto/createPostRequestDto';

export const createPost = async (body: CreatePostRequestDto) => {
  const res = await client.post('/api/posts', body).catch((err: any) => {
    throw err;
  });
  return res.data.post;
};
