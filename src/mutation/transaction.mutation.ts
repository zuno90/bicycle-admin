import { config } from "../utils/config.util";
import { fetchPut, getCache } from "../utils/helper.util";

export const updateTransactionByStatus = async (payload: any) => {
  const { id, statusPayment } = payload;
  const res = await fetchPut(
    `${config.endpoint}/payment/${id}`,
    JSON.stringify({ statusPayment }),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
