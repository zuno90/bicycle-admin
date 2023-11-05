import { config } from "../utils/config.util";
import { fetchPut, getCache } from "../utils/helper.util";

export const updateStatusNotification = async (id: number) => {
  const res = await fetchPut(
    `${config.endpoint}/notification/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
