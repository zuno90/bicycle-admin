import{q as i}from"./base-e8aaf39e.js";import{c as e}from"./config.util-005c10b6.js";import{o as r,g as a}from"./index-23d99e43.js";const g=async()=>{const s=await r(`${e.endpoint}/fetch-me`,{Authorization:`Bearer ${a(e.cache.accessToken)}`});if(s.success)return s.data.user},h=async(s,t,n)=>{const o=i.stringify({page:s,limit:t,status:n},{skipNull:!0,skipEmptyString:!0}),c=await r(`${e.endpoint}/users?${o}`,{Authorization:`Bearer ${a(e.cache.accessToken)}`});if(c.success)return c.data},m=async s=>{const t=await r(`${e.endpoint}/user/${s}`,{Authorization:`Bearer ${a(e.cache.accessToken)}`});if(t.success)return t.data.user};export{m as a,h as b,g};