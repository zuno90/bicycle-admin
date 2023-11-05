import { config } from "../utils/config.util";
import {
  fetchPostFormData,
  fetchPutFormData,
  getCache,
} from "../utils/helper.util";

export const createCategory = async (payload: any) => {
  const res = await fetchPostFormData(`${config.endpoint}/category`, payload, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  return res;
};

export const updateCategory = async (data: any) => {
  const res = await fetchPutFormData(
    `${config.endpoint}/category/${data.id}`,
    data.payload,
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
