import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getSubCategories = async (
  page: number,
  limit: number,
  id: number
) => {
  const params = queryString.stringify(
    { page, limit },
    { skipNull: true, skipEmptyString: true }
  );
  const res = await fetchGet(
    `${config.endpoint}/sub-category/category/${id}?${params}`,
    { Authorization: `Bearer ${getCache(config.cache.accessToken)}` }
  );
  if (res.success) return res.data;
};

export const getSubCategory = async (id: number) => {
  const res = await fetchGet(`${config.endpoint}/sub-category/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.subCategory;
};
