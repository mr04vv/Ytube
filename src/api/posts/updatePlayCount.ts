import client from 'utilities/apiClient';

const updatePlayCount = async (postId: number) => {
  const res = await client.put(`/api/posts/count/${postId}`).catch((err: any) => {
    throw err;
  });
  return res.data.post;
};
export default updatePlayCount;
