import { Category } from 'entity/entity/category';
import client from 'utilities/apiClient';

export const fetchCategoryList = async (): Promise<Category[]> => {
  const res = await client.get('api/categories').catch((err: any) => {
    throw err;
  });
  return res.data;
};
