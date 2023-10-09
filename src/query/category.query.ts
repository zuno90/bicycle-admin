import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getCategories = async () => {
  const res = await fetchGet(`${config.endpoint}/categories`);
  console.log(res);
  return res.data.categories;
};
