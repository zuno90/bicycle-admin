import{q as i}from"./base-e8aaf39e.js";import{c as t}from"./config.util-005c10b6.js";import{B as a,g as c}from"./index-30904653.js";const g=async(r,e,o)=>{const n=i.stringify({page:r,limit:e,status:o},{skipNull:!0,skipEmptyString:!0}),s=await a(`${t.endpoint}/vouchers?${n}`,{Authorization:`Bearer ${c(t.cache.accessToken)}`});if(s.success)return s.data},f=async r=>{const e=await a(`${t.endpoint}/voucher/${r}`,{Authorization:`Bearer ${c(t.cache.accessToken)}`});if(e.success)return e.data.voucher};export{g as a,f as g};
