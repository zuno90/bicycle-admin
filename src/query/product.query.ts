import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getProducts = async (page: number, limit?: number) => {
  const res = await fetchGet(`${config.endpoint}/products?page=${page}`);
  return res.data.products;
};
