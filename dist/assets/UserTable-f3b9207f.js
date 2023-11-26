import{u as h,j as e,L as b,p as i,O as k}from"./index-4d5fe437.js";import{c,u as p}from"./base-78ecd2d9.js";import{b as j}from"./user.query-0e89aa58.js";import{U as N}from"./user-d57577eb.js";import{P as u}from"./Pagination-d7a0e32e.js";const L=({title:o})=>{const{search:n}=h(),r=new URLSearchParams(n),a=Number(r.get("page"))||c.pagination.PAGE,d=Number(r.get("limit"))||c.pagination.LIMIT,l=r.get("status"),{data:s,isLoading:m}=p({queryKey:["users",{page:a,limit:d,status:l}],queryFn:()=>j(a,d,l)}),x=s&&s.totalUser;return m?e.jsx(b,{}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"space-y-10 mb-4 p-5",children:e.jsx("div",{className:"w-full inline-flex items-center justify-between",children:e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:o})})}),e.jsx("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:e.jsx("div",{className:"max-w-full overflow-x-auto",children:e.jsxs("table",{className:"w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-2 text-left dark:bg-meta-4",children:[e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Avatar"}),e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Ngày"}),e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Tên"}),e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Số điện thoại"}),e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Địa chỉ"}),e.jsx("th",{className:"py-4 px-4 font-medium text-black dark:text-white",children:"Xu"})]})}),e.jsx("tbody",{children:s.users.length>0&&s.users.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsx(i,{to:`/user/${t.id}`,children:e.jsx("img",{className:"w-14 rounded-lg",src:N,alt:"user-img"})})}),e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsx("p",{className:"text-xs text-black dark:text-white",children:new Date(t.createAt).toLocaleDateString("en-GB")})}),e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsx(i,{to:`/user/${t.id}`,children:e.jsx("p",{className:"text-xs text-black dark:text-white text-ellipsis overflow-hidden",children:t.name})})}),e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsx(i,{to:`/user/${t.id}`,children:e.jsx("p",{className:"text-xs text-black dark:text-white text-ellipsis overflow-hidden",children:t.phoneNumber})})}),e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsxs("p",{className:"text-xs text-black dark:text-white text-ellipsis overflow-hidden",children:[t.address," - ",t.ward," - ",t.district," -"," ",t.city]})}),e.jsx("td",{className:"border-b border-[#eee] py-5 px-4 dark:border-strokedark",children:e.jsxs("p",{className:"text-xs text-black dark:text-white text-ellipsis overflow-hidden",children:[k(t.coin),"đ"]})})]},t.id))})]})})}),x>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(u,{page:a,limit:d,total:x})})]})};export{L as default};
