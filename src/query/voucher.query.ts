import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getVouchers = async (
  page: number,
  limit: number,
  status: string | null
) => {
  const params = queryString.stringify(
    { page, limit, status },
    { skipNull: true, skipEmptyString: true }
  );
  const res = await fetchGet(`${config.endpoint}/vouchers?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};

export const getVoucher = async (id: number | string) => {
  const res = await fetchGet(`${config.endpoint}/voucher/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.voucher;
};
