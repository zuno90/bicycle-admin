import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getNotifications = async () => {
  const res = await fetchGet(`${config.endpoint}/notifications`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.notifications;
};
