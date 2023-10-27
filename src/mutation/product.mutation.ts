import { config } from "../utils/config.util";
import { fetchPostFormData, getCache } from "../utils/helper.util";

export const createProduct = async (payload: any) => {
  const res = await fetchPostFormData(`${config.endpoint}/product`, payload, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  console.log(res);
  return res;
};
