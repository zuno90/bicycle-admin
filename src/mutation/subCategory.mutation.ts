import { config } from "../utils/config.util";
import {
  fetchPostFormData,
  getCache,
} from "../utils/helper.util";

export const createSubCategory = async (payload: any) => {
  const res = await fetchPostFormData(`${config.endpoint}/category`, payload, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  return res;
};
