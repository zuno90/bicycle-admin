import queryString from "query-string";
import { fetchGet, getCache } from "../utils/helper.util";
import { config } from "../utils/config.util";

export const getOrders = async (
  page: number,
  limit: number,
  status: string | null
) => {
  const params = queryString.stringify(
    { page, limit, status },
    { skipNull: true, skipEmptyString: true }
  );
  const res = await fetchGet(`${config.endpoint}/orders?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};

export const getOrder = async (id: number) => {
  const res = await fetchGet(`${config.endpoint}/order/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.order;
};

export const getOrderCsv = async (fromAt: string, toAt: string) => {
  const params = queryString.stringify(
    { fromAt, toAt },
    { skipNull: true, skipEmptyString: true }
  );
  console.log(`${config.endpoint}/report/csv?${params}`);
  const res = await fetchGet(`${config.endpoint}/report/csv?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  return res;
};
