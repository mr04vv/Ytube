import { FetchMeResponseDto } from 'entity/responseDto/fetchMeResponseDto';
import client from 'utilities/apiClient';

export const fetchMyInfo = async (): Promise<FetchMeResponseDto> => {
  const res = await client.get('/api/me').catch((err: any) => {
    throw err;
  });
  return res.data;
};
