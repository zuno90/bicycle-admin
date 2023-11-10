import { ILoginInput } from "../__types__";
import { config } from "../utils/config.util";
import { fetchPost, getCache } from "../utils/helper.util";

export const login = async (payload: ILoginInput) => {
  const res = await fetchPost(
    `${config.endpoint}/signin`,
    JSON.stringify(payload)
  );
  return res;
};

export const logout = async () => {
  const res = await fetchPost(`${config.endpoint}/logout`, "", {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  return res;
};
