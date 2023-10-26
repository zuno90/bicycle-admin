import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getSizes = async () => {
  const res = await fetchGet(`${config.endpoint}/sizes`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.sizes;
};
