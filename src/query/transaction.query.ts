import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getTransactions = async (
  page: number,
  limit: number,
  status: string | null
) => {
  const params = queryString.stringify(
    { page, limit, status },
    { skipNull: true, skipEmptyString: true }
  );
  const res = await fetchGet(`${config.endpoint}/payments?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};
