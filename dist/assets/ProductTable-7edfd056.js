import{u as N,a as v,j as e,m as k,L as u,p as g}from"./index-33efbcb1.js";import{P as F}from"./Pagination-2fb815d4.js";import{c as h}from"./config.util-005c10b6.js";import{a as y}from"./product.query-a8767674.js";import{c as o}from"./index-aae92d59.js";import{u as w}from"./useQuery-58a04cb4.js";import"./base-e8aaf39e.js";import"./utils-8972a93d.js";import"./suspense-2f4aeef7.js";var f=(i=>(i.all="Tất cả",i.active="Đang hoạt động",i.inactive="Đang ẩn",i))(f||{});const I=({title:i})=>{const{search:p}=N(),d=v(),s=new URLSearchParams(p),l=Number(s.get("page"))||h.pagination.PAGE,c=Number(s.get("limit"))||h.pagination.LIMIT,x=s.get("status"),{data:a,isLoading:b}=w({queryKey:["products",{page:l,limit:c,status:x}],queryFn:()=>y(l,c,x)}),r=t=>{s.delete("page"),s.delete("limit"),t==="all"?s.delete("status"):s.set("status",t),d({search:s.toString()})},m=a&&a.totalStatusProduct[s.get("status")??"all"];return b?e.jsx(k,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"space-y-10 mb-4",children:[e.jsxs("div",{className:"w-full inline-flex items-center justify-between",children:[e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:i}),e.jsx("div",{className:"inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",onClick:()=>d("/product/create"),children:["Thêm sản phẩm",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{onClick:()=>r("all"),type:"button",className:o("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":!s.get("status")}),children:["Tất cả (",a.totalStatusProduct.all,")"]}),e.jsxs("button",{onClick:()=>r("active"),type:"button",className:o("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":s.get("status")==="active"}),children:["Đang hoạt động (",a.totalStatusProduct.active,")"]}),e.jsxs("button",{onClick:()=>r("inactive"),type:"button",className:o("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":s.get("status")==="inactive"}),children:["Đang ẩn (",a.totalStatusProduct.inactive,")"]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-7 border-stroke py-4 dark:border-strokedark sm:grid-cols-7",children:[e.jsx("div",{className:"col-span-1r",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Mã"})}),e.jsx("div",{className:"col-span-4",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Sản phẩm"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Giá"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold text-right xsm:text-base",children:"Trạng thái"})})]}),a.products.length>0&&a.products.map(t=>e.jsxs("div",{className:"grid grid-cols-7 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-7",children:[e.jsx(u,{to:`/product/${t.id}`,className:"col-span-1 flex items-center",children:e.jsxs("p",{className:"text-xs text-left text-black dark:text-white",children:["#",t.id]})}),e.jsxs(u,{to:`/product/${t.id}`,className:"col-span-4 flex items-center gap-2",children:[e.jsx("div",{className:"w-20 rounded-md",children:e.jsx("img",{className:"rounded-lg",src:t.images[0],alt:"Product"})}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{className:"text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden",children:t.name}),e.jsxs("p",{className:"text-xs font-thin text-black dark:text-white text-ellipsis overflow-hidden",children:["Lượt bán: ",t.sold]})]})]}),e.jsx("div",{className:"col-span-1 flex flex-col items-start justify-center gap-2",children:e.jsxs("p",{className:"text-xs text-black dark:text-white",children:[e.jsx("span",{className:"underline",children:"đ"}),e.jsxs("span",{children:[g(Math.min(...t.productItem.map(n=>n.price)))," - ",g(Math.max(...t.productItem.map(n=>n.price)))]})]})}),e.jsxs("div",{className:"col-span-1 flex flex-col items-end justify-center gap-2",children:[e.jsx("p",{className:"text-xs text-black dark:text-white",children:f[t.status]}),e.jsxs("p",{className:"text-xs text-black dark:text-white",children:["Tồn :"," ",t.productItem.map(n=>n.inventory).reduce((n,j)=>n+j)]})]})]},t.id)),m>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(F,{page:l,limit:c,total:m})})]})]})};export{I as default};