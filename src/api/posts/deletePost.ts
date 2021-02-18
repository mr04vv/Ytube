import client from 'utilities/apiClient';

export const deletePost = async (postId: number) => {
  const res = await client.delete(`/api/posts/${postId}`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
