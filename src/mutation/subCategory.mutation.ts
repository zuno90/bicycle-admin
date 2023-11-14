import { config } from "../utils/config.util";
import {
  fetchDelete,
  fetchPostFormData,
  fetchPutFormData,
  getCache,
} from "../utils/helper.util";

export const createSubCategory = async (payload: any) => {
  const res = await fetchPostFormData(
    `${config.endpoint}/sub-category`,
    payload,
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};

export const updateSubCategory = async (data: any) => {
  const res = await fetchPutFormData(
    `${config.endpoint}/sub-category/${data.id}`,
    data.payload,
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};

export const removeSubCategory = async (id: number) => {
  const res = await fetchDelete(
    `${config.endpoint}/sub-category/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
