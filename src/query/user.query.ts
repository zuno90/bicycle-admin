import queryString from "query-string";
import { config } from "../utils/config.util";
import { fetchGet, getCache } from "../utils/helper.util";

export const getUserInfo = async () => {
  const res = await fetchGet(`${config.endpoint}/fetch-me`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.user;
  return null;
};

export const getUsers = async (
  page: number,
  limit: number,
  status: string | null,
) => {
  const params = queryString.stringify(
    { page, limit, status },
    { skipNull: true, skipEmptyString: true },
  );
  const res = await fetchGet(`${config.endpoint}/users?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};

export const getUser = async (id: number | string) => {
  const res = await fetchGet(`${config.endpoint}/user/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.user;
};
