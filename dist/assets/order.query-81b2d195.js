import{q as d,c as o}from"./base-9adaf921.js";import{i as l,g as c}from"./index-034600bc.js";const h=async(a,t,s)=>{const r=d.stringify({page:a,limit:t,status:s},{skipNull:!0,skipEmptyString:!0}),n=await l(`${o.endpoint}/orders?${r}`,{Authorization:`Bearer ${c(o.cache.accessToken)}`});if(n.success)return n.data},g=async a=>{const t=await l(`${o.endpoint}/order/${a}`,{Authorization:`Bearer ${c(o.cache.accessToken)}`});if(t.success)return t.data.order},m=async(a,t)=>{const s=d.stringify({fromAt:a,toAt:t},{skipNull:!0,skipEmptyString:!0});try{const r=await fetch(`${o.endpoint}/report/csv?${s}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c(o.cache.accessToken)}`}});if(!r.ok)throw new Error("Không thể download file!");const n=await r.blob(),i=window.URL.createObjectURL(n);let e=document.getElementById("order-csv-download");return e||(e=document.createElement("a"),e.setAttribute("id","order-csv-download"),document.body.appendChild(e)),e.href=i,e.download="VPBicycle_Bao_cao_don_hang.xlsx",e.click(),window.URL.revokeObjectURL(i),n}catch(r){console.error(r)}};export{h as a,m as b,g};
