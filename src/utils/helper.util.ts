import { ToastPosition, toast } from "react-toastify";
import { ENotificationType } from "../__types__";

// channel receives message from service worker
export const channel = new BroadcastChannel("notifications");

// merge then sort arr
export const mergeSort = (arr: Array<number[]>) => {
  const eArray: number[] = [];
  for (let i = 0; i <= arr.length; i++) arr[i]?.forEach((e) => eArray.push(e));
  const sortedArr = eArray.sort((a: number, b: number) => a - b);
  return { min: sortedArr[0], max: sortedArr[sortedArr.length - 1] };
};

// merge then total arr
export const mergeTotal = (arr: Array<number[]>) => {
  const eArray: number[] = [];
  for (let i = 0; i <= arr.length; i++) arr[i]?.forEach((e) => eArray.push(e));
  return eArray.reduce((total, currentValue) => total + currentValue);
};

// format Number
export const formatNumber = (x: number) => {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// handle time ago
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

// format unread message
export const formatUnreadMsg = (num: number) => {
  if (num > 5) return `${num}+`;
  return num;
};

// notification
export const notify = (
  type: ENotificationType,
  content: JSX.Element | string,
  id?: string,
  position?: ToastPosition
) => {
  if (type === ENotificationType.info)
    return toast.info(content, { toastId: id, position, pauseOnHover: false });
  if (type === ENotificationType.success)
    return toast.success(content, {
      toastId: id,
      position,
      pauseOnHover: false,
    });
  if (type === ENotificationType.warning)
    return toast.warning(content, {
      toastId: id,
      position,
      pauseOnHover: false,
    });
  if (type === ENotificationType.error)
    return toast.error(content, { toastId: id, position, pauseOnHover: false });
};

// get local cache
export const getCache = (key: string) => window.localStorage.getItem(key);
export const setCache = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
export const delCache = (key: string) => window.localStorage.removeItem(key);
export const clearCache = () => window.localStorage.clear();

// call api
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

export const fetchPostFormData = async (
  url: string,
  body: string,
  header?: any
) => {
  try {
    const r = await fetch(url, {
      method: "POST",
      body,
      headers: { ...header },
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

export const fetchPutFormData = async (
  url: string,
  body: string,
  header?: any
) => {
  try {
    const r = await fetch(url, {
      method: "PUT",
      body,
      headers: { ...header },
    });
    const res = await r.json();
    const { success, data, message } = res;
    if (!success) throw new Error(message);
    return { success, data, message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
