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

export const updateProduct = async (data: any) => {
  const res = await fetchPutFormData(
    `${config.endpoint}/product/${data.id}`,
    data.payload,
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
