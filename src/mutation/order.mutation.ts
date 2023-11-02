import { config } from "../utils/config.util";
import { fetchPut, getCache } from "../utils/helper.util";

export const updateOrderStatus = async (payload: any) => {
  const { id, status } = payload;
  const res = await fetchPut(
    `${config.endpoint}/order/${id}`,
    JSON.stringify({ status }),
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  return res;
};
