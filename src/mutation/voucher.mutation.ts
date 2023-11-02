import { IVoucherInput } from "../__types__";
import { config } from "../utils/config.util";
import {
  fetchDelete,
  fetchPost,
  fetchPut,
  getCache,
} from "../utils/helper.util";

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

export const updateVoucherByStatus = async (id: number) => {
  const res = await fetchPut(
    `${config.endpoint}/voucher/status/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};

export const deleteVoucher = async (id: number) => {
  const res = await fetchDelete(
    `${config.endpoint}/voucher/${id}`,
    JSON.stringify({}),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
