import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getReports = async () => {
  const res = await fetchGet(`${config.endpoint}/report`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.report;
};
