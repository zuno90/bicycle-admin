// channel receives message from service worker
export const channel = new BroadcastChannel("notifications");

export const formatNumber = (x: number) => {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatTimeAgo = (deltaTime: number) => {
  let interval = Math.floor(deltaTime / 31536000);
  if (interval > 1) return interval + " năm trước";

  interval = Math.floor(deltaTime / 2592000);
  if (interval > 1) return interval + " tháng trước";

  interval = Math.floor(deltaTime / 86400);
  if (interval > 1) return interval + " ngày trước";

  interval = Math.floor(deltaTime / 3600);
  if (interval > 1) return interval + " giờ trước";

  interval = Math.floor(deltaTime / 60);
  if (interval > 1) return interval + " phút trước";

  if (deltaTime < 10) return "Vừa mới truy cập";

  return Math.floor(deltaTime) + " giây trước";
};

export const formatUnreadMsg = (num: number) => {
  if (num > 5) return `${num}+`;
  return num;
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
