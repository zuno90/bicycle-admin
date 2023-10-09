import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getCategories = async () => {
  const res = await fetchGet(`${config.endpoint}/categories`);
  return res.data.categories;
};
