import{c as a}from"./base-b320772a.js";import{f as n,g as r,k as c,aj as s}from"./index-f0192990.js";var o=(e=>(e.all="Tất cả",e.upcoming="Sắp diễn ra",e.ongoing="Đang hoạt động",e.inactive="Ngừng hoạt động",e))(o||{}),i=(e=>(e.cash="cash",e["%"]="%",e))(i||{});const u=async e=>await n(`${a.endpoint}/voucher`,JSON.stringify(e),{Authorization:`Bearer ${r(a.cache.accessToken)}`}),f=async e=>await c(`${a.endpoint}/voucher/status/${e}`,JSON.stringify({}),{Authorization:`Bearer ${r(a.cache.accessToken)}`}),p=async e=>await s(`${a.endpoint}/voucher/${e}`,JSON.stringify({}),{Authorization:`Bearer ${r(a.cache.accessToken)}`});export{i as E,o as a,u as c,p as d,f as u};
