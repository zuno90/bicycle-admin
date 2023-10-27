import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getCategories = async () => {
  const res = await fetchGet(`${config.endpoint}/categories`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.categories;
};
