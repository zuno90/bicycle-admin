import{q as i,c as t}from"./base-e6441cfb.js";import{i as r,g as c}from"./index-47085293.js";const u=async(a,e)=>{const o=i.stringify({page:a,limit:e},{skipNull:!0,skipEmptyString:!0}),s=await r(`${t.endpoint}/categories?${o}`,{Authorization:`Bearer ${c(t.cache.accessToken)}`});if(s.success)return s.data},p=async a=>{const e=await r(`${t.endpoint}/category/${a}`,{Authorization:`Bearer ${c(t.cache.accessToken)}`});if(console.log(e),e.success)return e.data.category};export{p as a,u as g};
