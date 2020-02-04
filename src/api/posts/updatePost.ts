import client from 'utilities/apiClient';
import { UpdatePostInterface } from 'interfaces/posts/CreatePostInterface';

const updatePost = async (postId: number, body: UpdatePostInterface) => {
  const res = await client.put(`/api/posts/${postId}`, body).catch((err: any) => {
    throw err;
  });
  return res.data.post;
};
export default updatePost;
