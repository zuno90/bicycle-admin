import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getUserInfo = async () => {
  const res = await fetchGet(`${config.endpoint}/fetch-me`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.user;
  return null;
};

export const getUser = async (uid: number | string | null) => {
  const res = await fetchGet(`${config.endpoint}/user/${uid}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.user;
  return null;
};
