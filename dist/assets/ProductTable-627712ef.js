import{u as B,a as P,b as E,c as T,m as D,j as e,L as Z,f as u,p as j,O as N,Q as q,d as v,n as o,E as d}from"./index-4da70cdd.js";import{P as I}from"./Pagination-78474be4.js";import{c as y,u as K,a as C}from"./base-664c3391.js";import{a as Q}from"./product.query-51a35cab.js";import{r as X,a as A}from"./product.mutation-3fd1e959.js";import{M as O}from"./Modal-8c5cbd9e.js";import{S as G}from"./Switcher-17a394fc.js";var k=(i=>(i.all="Tất cả",i.active="Đang hoạt động",i.inactive="Đang ẩn",i))(k||{});const _=({title:i})=>{const{search:w}=B(),g=P(),p=E(s=>s.common),x=T(),f=D(),t=new URLSearchParams(w),l=Number(t.get("page"))||y.pagination.PAGE,c=Number(t.get("limit"))||y.pagination.LIMIT,r=t.get("status"),{data:a,isLoading:F}=K({queryKey:["products",{page:l,limit:c,status:r}],queryFn:()=>Q(l,c,r)}),m=s=>{t.delete("page"),t.delete("limit"),s==="all"?t.delete("status"):t.set("status",s),g({search:t.toString()})},b=a&&a.totalStatusProduct[t.get("status")??"all"],{mutate:M}=C(X,{onSuccess:s=>{s.success?(f.invalidateQueries({queryKey:["products",{page:l,limit:c,status:r}]}),o(d.success,"Xoá sản phẩm thành công!")):o(d.error,"Xảy ra lỗi! Không thể xoá sản phẩm!")}}),{mutate:H}=C(A,{onSuccess:s=>{s.success?(f.invalidateQueries({queryKey:["products",{page:l,limit:c,status:r}]}),x(v()),o(d.success,"Cập nhật trạng thái sản phẩm thành công!")):o(d.error,"Xảy ra lỗi! Không thể cập nhật trạng thái sản phẩm!")}}),h=()=>x(v()),L=()=>e.jsx("p",{children:"Bạn muốn xoá sản phẩm này?"}),V=()=>e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:h,children:"Huỷ"}),e.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{M(p.modalId),h()},children:"Xác nhận"})]});return F?e.jsx(Z,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"space-y-10 mb-4",children:[e.jsxs("div",{className:"w-full inline-flex items-center justify-between",children:[e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:i}),e.jsx("div",{className:"inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",onClick:()=>g("/product/create"),children:["Thêm sản phẩm",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{onClick:()=>m("all"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":!t.get("status")}),children:["Tất cả (",a.totalStatusProduct.all,")"]}),e.jsxs("button",{onClick:()=>m("active"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":t.get("status")==="active"}),children:["Đang hoạt động (",a.totalStatusProduct.active,")"]}),e.jsxs("button",{onClick:()=>m("inactive"),type:"button",className:u("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":t.get("status")==="inactive"}),children:["Đang ẩn (",a.totalStatusProduct.inactive,")"]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-9 border-stroke py-4 dark:border-strokedark sm:grid-cols-9",children:[e.jsx("div",{className:"col-span-1"}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Mã"})}),e.jsx("div",{className:"col-span-4",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"Sản phẩm"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold text-center xsm:text-base",children:"Giá"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold text-center xsm:text-base",children:"Trạng thái"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold text-right xsm:text-base",children:"Hành động"})})]}),a.products.length>0&&a.products.map(s=>e.jsxs("div",{className:"grid grid-cols-9 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-9",children:[e.jsx("div",{className:"col-span-1 flex items-center",children:e.jsx(G,{id:s.id,isEnabled:s.statusDisplay,action:()=>H(s.id)})}),e.jsx(j,{to:`/product/${s.id}`,className:"col-span-1 flex items-center",children:e.jsxs("p",{className:"text-xs text-left text-black dark:text-white",children:["#",s.id]})}),e.jsxs(j,{to:`/product/${s.id}`,className:"col-span-4 flex items-center gap-2",children:[e.jsx("div",{className:"w-14 rounded-md",children:e.jsx("img",{className:"rounded-lg",src:s.images[0],alt:"Product"})}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{className:"text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden",children:s.name}),e.jsxs("p",{className:"text-xs font-thin text-black dark:text-white text-ellipsis overflow-hidden",children:["Lượt bán: ",s.sold]})]})]}),e.jsx("div",{className:"col-span-1 flex flex-col items-center justify-center gap-2",children:e.jsx("p",{className:"text-xs text-black dark:text-white",children:e.jsxs("span",{children:[N(Math.min(...s.productItem.map(n=>n.price)))," - ",N(Math.max(...s.productItem.map(n=>n.price))),e.jsx("span",{className:"underline",children:"đ"})]})})}),e.jsxs("div",{className:"col-span-1 flex flex-col items-center justify-center gap-2",children:[e.jsx("p",{className:"text-xs text-black dark:text-white",children:k[s.status]}),e.jsxs("p",{className:"text-xs text-black dark:text-white",children:["Tồn :"," ",s.productItem.map(n=>n.inventory).reduce((n,S)=>n+S)]})]}),e.jsx("div",{className:"col-span-1 flex justify-end",children:e.jsx("button",{type:"button",className:"hover:text-primary",onClick:()=>x(q({id:s.id,isOpen:!0})),children:e.jsxs("svg",{className:"fill-current",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z",fill:""}),e.jsx("path",{d:"M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z",fill:""}),e.jsx("path",{d:"M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z",fill:""}),e.jsx("path",{d:"M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z",fill:""})]})})})]},s.id)),b>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(I,{page:l,limit:c,total:b})}),p.isOpenModal&&e.jsx(O,{title:"Xoá sản phẩm",body:e.jsx(L,{}),footer:e.jsx(V,{}),close:h})]})]})};export{_ as default};
