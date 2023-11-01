import{u as C,a as H,ab as P,ac as V,j as e,m as E,L as f,o as b}from"./index-30904653.js";import{P as T}from"./Pagination-8e8427be.js";import{c as j}from"./config.util-005c10b6.js";import{a as L}from"./product.query-769ddda3.js";import{c as u}from"./index-bb7826c1.js";import{u as B}from"./useQuery-51a25627.js";import"./base-e8aaf39e.js";import"./utils-a7822234.js";import"./suspense-03e591c7.js";var v=(a=>(a.all="Tất cả",a.active="Đang hoạt động",a.inactive="Đang ẩn",a))(v||{});const K=({title:a})=>{const{search:N}=C(),i=H(),s=new URLSearchParams(N),l=Number(s.get("page"))||j.pagination.PAGE,r=Number(s.get("limit"))||j.pagination.LIMIT,g=s.get("status"),{data:n,isLoading:F}=B({queryKey:["products",{page:l,limit:r,status:g}],queryFn:()=>L(l,r,g)});console.log(n,33);const c=t=>{s.delete("page"),s.delete("limit"),t==="all"?s.delete("status"):s.set("status",t),i({search:s.toString()})};let o,m,h,p=0;if(n){const t=n.products.map(d=>d.productItem.map(x=>x.price)),k=n.products.map(d=>d.productItem.map(x=>x.inventory)),{min:y,max:w}=P(t);o=y,m=w,h=V(k),p=n.totalStatusProduct[s.get("status")??"all"]}return console.log(n),F?e.jsx(E,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{className:"w-full inline-flex items-center justify-between",children:[e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:a}),e.jsx("div",{className:"md:hidden inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",onClick:()=>i("/product/create"),children:["Thêm sản phẩm",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{onClick:()=>c("all"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":!s.get("status")}),children:["Tất cả (",n.totalStatusProduct.all,")"]}),e.jsxs("button",{onClick:()=>c("active"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":s.get("status")==="active"}),children:["Đang hoạt động (",n.totalStatusProduct.active,")"]}),e.jsxs("button",{onClick:()=>c("inactive"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":s.get("status")==="inactive"}),children:["Đang ẩn (",n.totalStatusProduct.inactive,")"]})]})]}),e.jsx("div",{className:"hidden md:inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",onClick:()=>i("/product/create"),children:["Thêm sản phẩm",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-7 border-stroke p-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5",children:[e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Mã"})}),e.jsx("div",{className:"col-span-4 flex items-center",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Sản phẩm"})}),e.jsx("div",{className:"col-span-1 flex items-center",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Giá"})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Trạng thái"})})]}),n.products.length>0&&n.products.map(t=>e.jsxs("div",{className:"grid grid-cols-7 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5",children:[e.jsx(f,{to:`/product/${t.id}`,className:"col-span-1 hidden items-center sm:flex",children:e.jsxs("p",{className:"text-xs text-black dark:text-white",children:["#",t.id]})}),e.jsxs(f,{to:`/product/${t.id}`,className:"col-span-4 flex items-center gap-1",children:[e.jsx("div",{className:"w-20 rounded-md",children:e.jsx("img",{className:"rounded-lg",src:t.images[0],alt:"Product"})}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{className:"text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden",children:t.name}),e.jsxs("p",{className:"text-xs font-thin text-black dark:text-white text-ellipsis overflow-hidden",children:["Lượt bán: ",t.sold]})]})]}),e.jsx("div",{className:"col-span-1 flex flex-col items-start justify-center gap-1",children:e.jsxs("p",{className:"text-sm text-black dark:text-white",children:[e.jsx("span",{className:"underline",children:"đ"}),e.jsxs("span",{children:[o&&b(o)," -"," ",m&&b(m)]})]})}),e.jsxs("div",{className:"col-span-1 hidden sm:flex flex-col items-start justify-center gap-1",children:[e.jsx("p",{className:"text-xs text-meta-5",children:v[t.status]}),e.jsxs("p",{className:"text-xs text-meta-5",children:["Tồn : ",h]})]})]},t.id)),n.products.length>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(T,{page:l,limit:r,total:p})})]})]})};export{K as default};
