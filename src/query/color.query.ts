import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getColors = async () => {
  const res = await fetchGet(`${config.endpoint}/colors`);
  return res.data.colors;
};
