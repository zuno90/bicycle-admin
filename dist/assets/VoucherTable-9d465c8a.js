import{B as j,g as N,R as v,j as e,u as C,a as k,b as F,c as y,m as w,o as V,n as u,E as h}from"./index-48b4b36f.js";import{P as H}from"./Pagination-80de7024.js";import{c}from"./index-6110098b.js";import{c as d}from"./config.util-005c10b6.js";import{q as E}from"./base-e8aaf39e.js";import{u as L}from"./voucher.mutation-9ce60942.js";import{u as S}from"./useQuery-94e526d6.js";import{u as B}from"./useMutation-28694a44.js";import"./utils-9dbac140.js";import"./suspense-d01818bc.js";var g=(n=>(n.all="Tất cả",n.upcoming="Sắp diễn ra",n.ongoing="Đang hoạt động",n.inactive="Ngừng hoạt động",n))(g||{});const T=async(n,r,a)=>{const s=E.stringify({page:n,limit:r,status:a},{skipNull:!0,skipEmptyString:!0}),l=await j(`${d.endpoint}/vouchers?${s}`,{Authorization:`Bearer ${N(d.cache.accessToken)}`});if(l.success)return l.data},M=({id:n,isEnabled:r})=>{const[a,s]=v.useState(r);return e.jsx("div",{"x-data":"{ switcherToggle: false }",children:e.jsx("label",{htmlFor:`toggle${n}`,className:"flex cursor-pointer select-none items-center",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{id:`toggle${n}`,type:"checkbox",className:"sr-only",onChange:()=>s(!a)}),e.jsx("div",{className:c("h-5 w-14 rounded-full bg-gray dark:bg-[#5A616B] shadow-inner",{"bg-success dark:bg-success":a})}),e.jsx("div",{className:c("dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition",{"!right-0 !translate-x-full !bg-white dark:!bg-white":a})})]})})})},Q=({title:n})=>{const{search:r}=C(),a=k();F(t=>t.voucher),y();const s=new URLSearchParams(r),l=Number(s.get("page"))||d.pagination.PAGE,m=Number(s.get("limit"))||d.pagination.LIMIT,x=s.get("status"),{data:i,isLoading:f}=S({queryKey:["vouchers",{page:l,limit:m,status:x}],queryFn:()=>T(l,m,x)});console.log(i,66);const p=i&&i.totalVoucherStatus[s.get("status")??"all"],o=t=>{s.delete("page"),s.delete("limit"),t==="all"?s.delete("status"):s.set("status",t),a({search:s.toString()})},{mutate:Z,isLoading:b}=B(L,{onSuccess:t=>{t.success?u(h.success,"Cập nhật trạng thái voucher thành công!"):u(h.error,"Xảy ra lỗi! Không thể cập nhật trạng thái voucher!")}});return f||b?e.jsx(w,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{className:"w-full inline-flex items-center justify-between",children:[e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:n}),e.jsx("div",{className:"md:hidden inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",onClick:()=>a("/voucher/create"),children:["Tạo mã khuyến mãi",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:()=>o("all"),className:c("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":!s.get("status")}),children:["Tất cả (",i.totalVoucherStatus.all,")"]}),e.jsxs("button",{onClick:()=>o("upcoming"),type:"button",className:c("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":s.get("status")==="upcoming"}),children:["Sắp diễn ra (",i.totalVoucherStatus.upcoming,")"]}),e.jsxs("button",{onClick:()=>o("ongoing"),type:"button",className:c("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":s.get("status")==="ongoing"}),children:["Đang hoạt động (",i.totalVoucherStatus.ongoing,")"]}),e.jsxs("button",{onClick:()=>o("inactive"),type:"button",className:c("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",{"bg-[#FBE69E]":s.get("status")==="inactive"}),children:["Ngừng hoạt động (",i.totalVoucherStatus.inactive,")"]})]})]}),e.jsx("div",{className:"hidden md:inline-flex items-center gap-4",children:e.jsxs("button",{type:"button",className:"text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",onClick:()=>a("/voucher/create"),children:["Tạo mã khuyến mãi",e.jsx("svg",{className:"w-4 h-4 ml-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})]})})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-6 border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5",children:[e.jsx("div",{className:"col-span-1 flex items-center"}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Mã"})}),e.jsx("div",{className:"col-span-2 flex items-center",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Tên khuyến mãi"})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Giảm giá"})}),e.jsx("div",{className:"col-span-1 flex items-center",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Thời gian"})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Trạng thái"})}),e.jsx("div",{className:"col-span-2 sm:col-span-1 flex justify-end text-end",children:e.jsx("h5",{className:"text-sm font-medium xsm:text-base",children:"Hành động"})})]}),i.vouchers.length>0&&i.vouchers.map(t=>e.jsxs("div",{className:"grid grid-cols-6 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5",children:[e.jsx("div",{className:"col-span-1 flex items-center",children:e.jsx(M,{id:t.id,isEnabled:t.statusDisplay})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsxs("p",{className:"text-xs text-black dark:text-white",children:["#",t.code]})}),e.jsx("div",{className:"col-span-2 flex items-center",children:e.jsx("p",{className:"text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden",children:t.title})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsxs("p",{className:"text-xs text-black dark:text-white",children:[e.jsx("span",{className:"underline",children:"đ"}),e.jsx("span",{children:V(t.value)})]})}),e.jsx("div",{className:"col-span-1 flex items-center",children:e.jsx("p",{className:"text-xs text-black dark:text-white",children:"12/09/23 - 30/09/23"})}),e.jsx("div",{className:"col-span-1 hidden sm:flex items-center",children:e.jsx("p",{className:"text-xs text-black dark:text-white",children:g[t.status]})}),e.jsx("div",{className:"col-span-2 sm:col-span-1 flex justify-center text-end",children:e.jsx("div",{className:"flex items-center justify-center gap-4",children:e.jsx("button",{className:"hover:text-primary",children:e.jsxs("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z",fill:""}),e.jsx("path",{d:"M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z",fill:""}),e.jsx("path",{d:"M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z",fill:""}),e.jsx("path",{d:"M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z",fill:""})]})})})})]},t.id)),i.vouchers.length>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(H,{page:l,limit:m,total:p})})]})]})};export{Q as default};
