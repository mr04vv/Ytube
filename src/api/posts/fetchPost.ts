import client from 'utilities/apiClient';

const fetchPost = async (postId: number) => {
  const res = await client.get(`/api/post_by_id/${postId}`).catch((err: any) => {
    throw err;
  });
  return res.data.post;
};
export default fetchPost;
