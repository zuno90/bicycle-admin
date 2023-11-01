import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getProducts = async (
  page: number,
  limit: number,
  status: string | null
) => {
  const params = queryString.stringify(
    { page, limit, status },
    { skipNull: true, skipEmptyString: true }
  );
  console.log(`${config.endpoint}/products?${params}`);
  const res = await fetchGet(`${config.endpoint}/products?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};

export const getProduct = async (id: number) => {
  const res = await fetchGet(`${config.endpoint}/product/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.product;
};
