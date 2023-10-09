export const formatNumber = (x: number) => {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const fetchGet = async (url: string, header?: any) => {
  try {
    const r = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...header },
    });
    const res = await r.json();
    const { success, data, message } = res;
    if (!success) throw new Error(message);
    return { success, data, message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const fetchPost = async (url: string, body: string, header?: any) => {
  try {
    const r = await fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json", ...header },
    });
    const res = await r.json();
    const { success, data, message } = res;
    if (!success) throw new Error(message);
    return { success, data, message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const fetchPut = async (url: string, body: string, header?: any) => {
  try {
    const r = await fetch(url, {
      method: "PUT",
      body,
      headers: { "Content-Type": "application/json", ...header },
    });
    const res = await r.json();
    const { success, data, message } = res;
    if (!success) throw new Error(message);
    return { success, data, message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
