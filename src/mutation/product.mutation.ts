import { config } from "../utils/config.util";
import {
  fetchPostFormData,
  fetchPutFormData,
  getCache,
} from "../utils/helper.util";

export const createProduct = async (payload: any) => {
  const res = await fetchPostFormData(`${config.endpoint}/product`, payload, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  return res;
};

export const updateProduct = async (id: number, payload: any) => {
  const res = await fetchPutFormData(
    `${config.endpoint}/product/${id}`,
    payload,
    {
      Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
    }
  );
  return res;
};
