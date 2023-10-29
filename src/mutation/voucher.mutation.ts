import { IVoucherInput } from "../__types__";
import { config } from "../utils/config.util";
import { fetchPost, fetchPut, getCache } from "../utils/helper.util";

export const createVoucher = async (payload: IVoucherInput) => {
  const res = await fetchPost(
    `${config.endpoint}/voucher`,
    JSON.stringify(payload),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};

export const updateVoucher = async (data: any) => {
  const { id, payload } = data;
  const res = await fetchPut(
    `${config.endpoint}/voucher/${id}`,
    JSON.stringify(payload),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
