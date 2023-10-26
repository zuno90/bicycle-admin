import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getColors = async () => {
  const res = await fetchGet(`${config.endpoint}/colors`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.colors;
};
