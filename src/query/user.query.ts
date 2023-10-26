import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getUser = async () => {
  const res = await fetchGet(`${config.endpoint}/fetch-me`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.user;
};
