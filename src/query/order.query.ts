import queryString from "query-string";
import { fetchGet, getCache } from "../utils/helper.util";
import { config } from "../utils/config.util";

export const getOrders = async (
  page: number,
  limit: number,
  status: string | null,
  fromAt: number,
  toAt: number
) => {
  const params = queryString.stringify(
    { page, limit, status, fromAt, toAt },
    { skipNull: true, skipEmptyString: true }
  );
  const res = await fetchGet(`${config.endpoint}/orders?${params}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data;
};

export const getOrder = async (id: number) => {
  const res = await fetchGet(`${config.endpoint}/order/${id}`, {
    Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
  });
  if (res.success) return res.data.order;
};

export const getOrderCsv = async (fromAt: number, toAt: number) => {
  const params = queryString.stringify(
    { fromAt, toAt },
    { skipNull: true, skipEmptyString: true }
  );
  try {
    const r = await fetch(`${config.endpoint}/report/csv?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCache(config.cache.accessToken)}`,
      },
    });
    if (!r.ok) throw new Error("Không thể download file!");
    const res = await r.blob();
    const url = window.URL.createObjectURL(res);
    let a = document.getElementById("order-csv-download");
    if (!a) {
      a = document.createElement("a");
      a.setAttribute("id", "order-csv-download");
      document.body.appendChild(a);
    }
    a.href = url;
    a.download = "VPBicycle_Bao_cao_don_hang.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};
