import client from 'utilities/apiClient';
import { UpdatePostRequestDto } from 'entity/requestDto/updatePostRequestDto';

export const updatePost = async (postId: number, body: UpdatePostRequestDto) => {
  const res = await client.put(`/api/posts/${postId}`, body).catch((err: any) => {
    throw err;
  });
  return res.data.post;
};
