import { Category } from 'entity/entity/category';
import { CreateCategoryRequestDto } from 'entity/requestDto/createCategoryRequestDto';
import client from 'utilities/apiClient';

export const createCategory = async (body: CreateCategoryRequestDto): Promise<Category[]> => {
  const res = await client.post('api/categories', body).catch((err: any) => {
    throw err;
  });
  return res.data;
};
