import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getNotifications = async (page: number, limit: number) => {
  const params = queryString.stringify({ page, limit });
  const res = await fetchGet(`${config.endpoint}/notifications?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.notifications;
};
