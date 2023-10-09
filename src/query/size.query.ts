import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getSizes = async () => {
  const res = await fetchGet(`${config.endpoint}/sizes`);
  return res.data.sizes;
};
