import { PostResponseDto } from 'entity/responseDto/postResponseDto';
import client from 'utilities/apiClient';

const fetchPost = async (postId: number): Promise<PostResponseDto> => {
  const res = await client.get(`/api/post_by_id/${postId}`).catch((err: any) => {
    throw err;
  });
  return res.data;
};
export default fetchPost;
