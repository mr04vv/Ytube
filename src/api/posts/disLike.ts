import client from 'utilities/apiClient';

export const disLike = async (postId: number) => {
  const res = await client.delete(`/api/likes/${postId}`).catch((err: any) => {
    throw err;
  });
  return res;
};
