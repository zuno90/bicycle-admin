import { config } from "../utils/config.util";
import { fetchGet } from "../utils/helper.util";

export const getUser = async () => {
  const res = await fetchGet(`${config.endpoint}/fetch-me`, {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });
  console.log(res);
};
