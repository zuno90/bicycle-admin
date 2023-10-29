import { IVoucherInput } from "../__types__";
import { config } from "../utils/config.util";
import { fetchPost, getCache } from "../utils/helper.util";

export const createVoucher = async (payload: IVoucherInput) => {
  const res = await fetchPost(
    `${config.endpoint}/voucher`,
    JSON.stringify(payload),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
