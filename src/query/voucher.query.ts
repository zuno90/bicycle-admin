import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getVouchers = async (page: number, limit?: number) => {
  const res = await fetchGet(`${config.endpoint}/vouchers`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  console.log(res);
  if (res.success) return res.data;
};
