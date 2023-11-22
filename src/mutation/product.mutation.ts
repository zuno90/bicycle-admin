import { config } from "../utils/config.util";
import {
  fetchDelete,
  fetchPostFormData,
  fetchPut,
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

export const updateProductByStatus = async (id: number) => {
  const res = await fetchPut(
    `${config.endpoint}/product/status/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};

export const removeProduct = async (id: number) => {
  const res = await fetchDelete(
    `${config.endpoint}/product/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
