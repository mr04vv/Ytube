import client from 'utilities/apiClient';

const updateUser = async (imageUrl: string) => {
  const res = await client.put('/api/users/me', imageUrl).catch((err: any) => {
    throw err;
  });
  return res;
};
export default updateUser;
