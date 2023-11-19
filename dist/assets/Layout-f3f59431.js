import{i as B,g as k,k as H,R as t,_ as d,j as e,u as M,N as m,m as L,o as N,n as p,E as f,f as b,L as v,b as Q,c as Z,d as R,l as S,s as D,p as j,q as z,t as w}from"./index-c0487efa.js";import{c as g,q,u as T,a as E,b as W}from"./base-fa6d096f.js";const _=async s=>await B(`${g.endpoint}/notification/${s}`,JSON.stringify({}),{Authorization:`Bearer ${k(g.cache.accessToken)}`}),I=async(s,n)=>{const r=q.stringify({page:s,limit:n}),a=await H(`${g.endpoint}/notifications?${r}`,{Authorization:`Bearer ${k(g.cache.accessToken)}`});if(a.success)return a.data.notifications},O=t.lazy(()=>d(()=>import("./Order-37980beb.js"),["assets/Order-37980beb.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/base-fa6d096f.js"])),F=t.lazy(()=>d(()=>import("./OrderDetail-e083cbf8.js"),["assets/OrderDetail-e083cbf8.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/order.type-e78449c3.js","assets/order.query-bc421708.js","assets/base-fa6d096f.js","assets/Modal-f8f32952.js"])),P=t.lazy(()=>d(()=>import("./OrderInvoice-62a4c528.js"),["assets/OrderInvoice-62a4c528.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/order.query-bc421708.js","assets/base-fa6d096f.js"])),G=t.lazy(()=>d(()=>import("./Transaction-7503ba1a.js"),["assets/Transaction-7503ba1a.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),J=t.lazy(()=>d(()=>import("./TransactionDetail-f06c777b.js"),["assets/TransactionDetail-f06c777b.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),U=t.lazy(()=>d(()=>import("./Category-0bb6da28.js"),["assets/Category-0bb6da28.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),Y=t.lazy(()=>d(()=>import("./CategoryDetail-8e99c480.js"),["assets/CategoryDetail-8e99c480.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),K=t.lazy(()=>d(()=>import("./Product-e1436dc5.js"),["assets/Product-e1436dc5.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),X=t.lazy(()=>d(()=>import("./ProductDetail-8397a854.js"),["assets/ProductDetail-8397a854.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/TinyMce-7d6090d5.js","assets/base-fa6d096f.js","assets/index-048d3aac.js","assets/index.esm-a0903cc1.js","assets/category.query-56cc4252.js","assets/product.query-03ed703c.js","assets/product.mutation-0587fcc4.js"])),$=t.lazy(()=>d(()=>import("./CreateProduct-b9c5f474.js"),["assets/CreateProduct-b9c5f474.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/TinyMce-7d6090d5.js","assets/base-fa6d096f.js","assets/index-048d3aac.js","assets/index.esm-a0903cc1.js","assets/category.query-56cc4252.js","assets/product.mutation-0587fcc4.js"])),e1=t.lazy(()=>d(()=>import("./Voucher-c21f4f4e.js"),["assets/Voucher-c21f4f4e.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),t1=t.lazy(()=>d(()=>import("./CreateVoucher-6c7a42bd.js"),["assets/CreateVoucher-6c7a42bd.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/index.esm-a0903cc1.js","assets/voucher.mutation-adac344b.js","assets/base-fa6d096f.js"])),s1=t.lazy(()=>d(()=>import("./Chat-1dbc7a6b.js"),["assets/Chat-1dbc7a6b.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/index-048d3aac.js","assets/user-d57577eb.js","assets/user.query-41108aad.js","assets/base-fa6d096f.js","assets/Chat-c2cbbdf6.css"])),a1=t.lazy(()=>d(()=>import("./User-e87e64ab.js"),["assets/User-e87e64ab.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),r1=t.lazy(()=>d(()=>import("./UserDetail-68eb8013.js"),["assets/UserDetail-68eb8013.js","assets/index-c0487efa.js","assets/index-906c1e23.css","assets/user.query-41108aad.js","assets/base-fa6d096f.js","assets/user-d57577eb.js"])),n1=t.lazy(()=>d(()=>import("./Test-d64a8304.js"),["assets/Test-d64a8304.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),l1=[{path:"",index:!0,title:"Trang chủ",element:O},{path:"/order/:id",title:"Chi tiết đơn hàng",element:F},{path:"/order/invoice/:id",title:"Chi tiết đơn hàng",element:P},{path:"/transaction",title:"Giao dịch",element:G},{path:"/transaction/:id",title:"Chi tiết giao dịch",element:J},{path:"/category",title:"Danh mục",element:U},{path:"/category/:id",title:"Chi tiết danh mục",element:Y},{path:"/product",title:"Sản phẩm",element:K},{path:"/product/:id",title:"Cập nhật sản phẩm",element:X},{path:"/product/create",title:"Thêm Sản phẩm",element:$},{path:"/voucher",title:"Khuyến mãi",element:e1},{path:"/voucher/create",title:"Tạo mã khuyến mãi",element:t1},{path:"/chat",title:"Chat",element:s1},{path:"/user",title:"Quản lý người dùng",element:a1},{path:"/user/:id",title:"Thông tin người dùng",element:r1},{path:"/test",title:"Test page",element:n1}],o1=[...l1],i1="/assets/logo-6d593be9.svg",d1=({children:s,activeCondition:n})=>{const[r,a]=t.useState(n),l=()=>a(!r);return e.jsx("li",{children:s(l,r)})},A1=({sidebarOpen:s,setSidebarOpen:n})=>{const r=M(),{pathname:a}=r,l=t.useRef(null),c=t.useRef(null),x=localStorage.getItem("sidebar-expanded"),[u]=t.useState(x===null?!1:x==="true");return t.useEffect(()=>{const A=({target:o})=>{!c.current||!l.current||!s||c.current.contains(o)||l.current.contains(o)||n(!1)};return document.addEventListener("click",A),()=>document.removeEventListener("click",A)}),t.useEffect(()=>{const A=({keyCode:o})=>{!s||o!==27||n(!1)};return document.addEventListener("keydown",A),()=>document.removeEventListener("keydown",A)}),t.useEffect(()=>{var A,o;localStorage.setItem("sidebar-expanded",u.toString()),u?(A=document.querySelector("body"))==null||A.classList.add("sidebar-expanded"):(o=document.querySelector("body"))==null||o.classList.remove("sidebar-expanded")},[u]),e.jsxs("aside",{ref:c,className:`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${s?"translate-x-0":"-translate-x-full"}`,children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5",children:[e.jsx(m,{to:"/",children:e.jsx("img",{src:i1,alt:"Logo"})}),e.jsx("button",{ref:l,onClick:()=>n(!s),"aria-controls":"sidebar","aria-expanded":s,className:"block lg:hidden",children:e.jsx("svg",{className:"fill-current",width:"20",height:"18",viewBox:"0 0 20 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z",fill:""})})})]}),e.jsx("div",{className:"no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear",children:e.jsx("nav",{className:"mt-5 py-4 px-4 lg:mt-9 lg:px-6",children:e.jsxs("ul",{className:"mb-6 flex flex-col gap-4",children:[e.jsx(d1,{activeCondition:a==="/",children:()=>e.jsxs(m,{to:"/",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${a==="/"&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsxs("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z",fill:""}),e.jsx("path",{d:"M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z",fill:""}),e.jsx("path",{d:"M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z",fill:""}),e.jsx("path",{d:"M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z",fill:""})]}),"Trang chủ"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/transaction",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(a==="/transaction"||a.includes("/transaction"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx("svg",{className:"fill-current",width:18,height:18,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"none",children:e.jsx("path",{d:"M11 8C11 10.21 9.21 12 7 12C4.79 12 3 10.21 3 8C3 5.79 4.79 4 7 4C9.21 4 11 5.79 11 8M11 14.72V20H0V18C0 15.79 3.13 14 7 14C8.5 14 9.87 14.27 11 14.72M24 20H13V3H24V20M16 11.5C16 10.12 17.12 9 18.5 9C19.88 9 21 10.12 21 11.5C21 12.88 19.88 14 18.5 14C17.12 14 16 12.88 16 11.5M22 7C20.9 7 20 6.11 20 5H17C17 6.11 16.11 7 15 7V16C16.11 16 17 16.9 17 18H20C20 16.9 20.9 16 22 16V7Z"})}),"Giao dịch"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/category",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(a==="/category"||a.includes("/category"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z",fill:""})}),"Danh mục"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/product",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(a==="/product"||a.includes("/product"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx("svg",{className:"fill-current",width:18,height:18,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M19 10C18.44 10 17.91 10.11 17.41 10.28L14.46 4.5H11V6H13.54L14.42 7.72L12 13.13L10.23 8.95C10.5 8.85 10.74 8.58 10.74 8.25C10.74 7.84 10.41 7.5 10 7.5H8C7.58 7.5 7.24 7.84 7.24 8.25S7.58 9 8 9H8.61L10.86 14.25H9.92C9.56 11.85 7.5 10 5 10C2.24 10 0 12.24 0 15S2.24 20 5 20C7.5 20 9.56 18.15 9.92 15.75H12.5L15.29 9.43L16.08 10.96C14.82 11.87 14 13.34 14 15C14 17.76 16.24 20 19 20S24 17.76 24 15 21.76 10 19 10M5 18.5C3.07 18.5 1.5 16.93 1.5 15S3.07 11.5 5 11.5C6.67 11.5 8.07 12.68 8.41 14.25H4V15.75H8.41C8.07 17.32 6.67 18.5 5 18.5M19 18.5C17.07 18.5 15.5 16.93 15.5 15C15.5 13.92 16 12.97 16.77 12.33L18.57 15.85L19.89 15.13L18.1 11.63C18.39 11.56 18.69 11.5 19 11.5C20.93 11.5 22.5 13.07 22.5 15S20.93 18.5 19 18.5Z"})}),"Sản phẩm"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/voucher",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(a==="/voucher"||a.includes("/voucher"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8M4 4H20C21.11 4 22 4.89 22 6V10C20.9 10 20 10.9 20 12C20 13.11 20.9 14 22 14V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V14C3.11 14 4 13.11 4 12C4 10.9 3.11 10 2 10V6C2 4.89 2.9 4 4 4M4 6V8.54C5.24 9.26 6 10.57 6 12C6 13.43 5.24 14.75 4 15.46V18H20V15.46C18.76 14.75 18 13.43 18 12C18 10.57 18.76 9.26 20 8.54V6H4M9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8M14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z"})}),"Khuyến mãi"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/chat",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(a==="/chat"||a.includes("/chat"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsxs("svg",{className:"fill-current",width:"18",height:"18",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[e.jsx("title",{children:"chat-outline"}),e.jsx("path",{d:"M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z"})]}),"Chat"]})}),e.jsx("li",{children:e.jsxs(m,{to:"/user",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${a==="/user"&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsxs("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z",fill:""}),e.jsx("path",{d:"M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z",fill:""})]}),"Quản lí người dùng"]})})]})})})]})},c1="/assets/logo-icon-cc979474.svg";function u1(s,n){const[r,a]=t.useState(()=>{try{const l=window.localStorage.getItem(s);return l?JSON.parse(l):n}catch(l){return console.log(l),n}});return t.useEffect(()=>{try{const l=typeof r=="function"?r(r):r;window.localStorage.setItem(s,JSON.stringify(l))}catch(l){console.log(l)}},[s,r]),[r,a]}const h1=()=>{const[s,n]=u1("color-theme","light");return t.useEffect(()=>{const r="dark",a=window.document.body.classList;s==="dark"?a.add(r):a.remove(r)},[s]),[s,n]},x1=()=>{const[s,n]=h1();return e.jsx("li",{children:e.jsxs("label",{className:`relative m-0 block h-7.5 w-14 rounded-full ${s==="dark"?"bg-primary":"bg-stroke"}`,children:[e.jsx("input",{type:"checkbox",onChange:()=>typeof n=="function"&&n(s==="light"?"dark":"light"),className:"dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"}),e.jsxs("span",{className:`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${s==="dark"&&"!right-[3px] !translate-x-full"}`,children:[e.jsx("span",{className:"dark:hidden",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z",fill:"#969AA1"}),e.jsx("path",{d:"M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z",fill:"#969AA1"})]})}),e.jsx("span",{className:"hidden dark:inline-block",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z",fill:"#969AA1"})})})]})]})})},m1=()=>{const s=L(),[n,r]=t.useState(!1),[a,l]=t.useState(!1),c=t.useRef(null),x=t.useRef(null),[u,A]=t.useState(g.pagination.PAGE),[o]=t.useState(5);t.useEffect(()=>{N.addEventListener("message",i=>{console.log(i,"trong cai chuong"),r(!0)})},[]),t.useEffect(()=>{const i=({target:C})=>{x.current&&(!a||x.current.contains(C)||c.current.contains(C)||l(!1))};return document.addEventListener("click",i),()=>document.removeEventListener("click",i)}),t.useEffect(()=>{const i=({key:C})=>{!a||C!=="Escape"||l(!1)};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)});const{data:h,isLoading:y}=T({queryKey:["notifications",{page:u,limit:o}],queryFn:()=>I(u,o)}),{mutate:V}=E(_,{onSuccess:i=>{i.success?(s.invalidateQueries({queryKey:["notifications",{page:u,limit:o}]}),p(f.info,"Đã đánh dấu đọc","update-noti")):p(f.error,"Xảy ra lỗi! Thử lại sau","update-noti")}});return e.jsxs("li",{className:"relative",children:[e.jsxs("button",{ref:c,type:"button",onClick:()=>{r(!1),l(!a)},className:"relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white",children:[n&&e.jsx("span",{className:"absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1",children:e.jsx("span",{className:"absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"})}),e.jsx("svg",{className:"fill-current duration-300 ease-in-out",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"})})]}),e.jsxs("div",{ref:x,onFocus:()=>l(!0),onBlur:()=>l(!1),className:b("absolute -right-27 mt-2.5 flex w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80",{block:a===!0,hidden:a===!1}),children:[e.jsxs("div",{className:"px-4.5 py-3 inline-flex justify-between items-center",children:[e.jsx("h5",{className:"text-sm font-bold text-bodydark2",children:"Thông báo"}),e.jsxs("div",{className:"text-sm font-bold text-bodydark2 inline-flex gap-4",children:[e.jsx("button",{type:"button",disabled:u===1,onClick:()=>A(i=>i-1),className:"px-1.5 bg-primary text-white rounded-full",children:"<"}),e.jsx("button",{type:"button",disabled:(h==null?void 0:h.length)<5,onClick:()=>A(i=>i+1),className:"px-1.5 bg-primary text-white rounded-full",children:">"})]})]}),e.jsx("ul",{className:"flex h-auto flex-col overflow-y-auto",children:y?e.jsx(v,{loadInside:!0}):h.length>0&&h.map(i=>e.jsxs("li",{onClick:()=>!i.isRead&&V(i.id),className:b("flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4",{"bg-[#FFF7D9] cursor-pointer":!i.isRead}),children:[e.jsx("p",{className:"text-sm text-black dark:text-white font-bold",children:i.title}),e.jsx("p",{className:"text-xs text-black dark:text-white",children:i.content}),e.jsx("p",{className:"text-xs",children:new Date(i.createAt).toLocaleDateString("en-GB")})]},i.id))})]})]})},g1="/assets/zuno-d3681803.png",C1="data:image/png;base64,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",p1=()=>{const s=Q(o=>o.auth),n=Z(),[r,a]=t.useState(!1),l=t.useRef(null),c=t.useRef(null);t.useEffect(()=>{const o=({target:h})=>{c.current&&(!r||c.current.contains(h)||l.current.contains(h)||a(!1))};return document.addEventListener("click",o),()=>document.removeEventListener("click",o)}),t.useEffect(()=>{const o=({key:h})=>{!r||h!=="Escape"||a(!1)};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)});const{mutate:x,isLoading:u}=E(W,{onSuccess:o=>{if(!o.success)return p(f.error,"Lỗi! Không thể đăng xuất!");n(R()),n(S(!1)),n(D(null)),window.localStorage.clear(),p(f.info,"Đăng xuất tài khoản thành công!")}}),A=async()=>x();return e.jsxs("div",{className:"relative",children:[e.jsxs(j,{ref:l,onClick:()=>a(!r),className:"flex items-center gap-4",to:"#",children:[e.jsxs("span",{className:"hidden text-right lg:block",children:[e.jsx("span",{className:"block text-sm font-medium text-black dark:text-white",children:s.user.name??"ADMIN"}),e.jsx("span",{className:"block text-xs",children:"Super Admin"})]}),e.jsx("span",{className:"h-12 w-12 rounded-full",children:e.jsx("img",{src:s.user.phoneNumber==="0933663240"?g1:C1,alt:"User"})}),e.jsx("svg",{className:b("hidden fill-current sm:block",{"rotate-180":r}),width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z",fill:""})})]}),e.jsx("div",{ref:c,onFocus:()=>a(!0),onBlur:()=>a(!1),className:b("absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",{block:r===!0,hidden:r===!1}),children:e.jsxs("button",{onClick:A,disabled:u,className:"flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",children:[e.jsxs("svg",{className:"fill-current",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z",fill:""}),e.jsx("path",{d:"M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z",fill:""})]}),"Đăng xuất"]})})]})},f1=s=>e.jsx("header",{className:"sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none",children:e.jsxs("div",{className:"flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-4 lg:hidden",children:[e.jsx("button",{"aria-controls":"sidebar",onClick:n=>{n.stopPropagation(),s.setSidebarOpen(!s.sidebarOpen)},className:"z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden",children:e.jsxs("span",{className:"relative block h-5.5 w-5.5 cursor-pointer",children:[e.jsxs("span",{className:"du-block absolute right-0 h-full w-full",children:[e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!s.sidebarOpen&&"!w-full delay-300"}`}),e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!s.sidebarOpen&&"delay-400 !w-full"}`}),e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!s.sidebarOpen&&"!w-full delay-500"}`})]}),e.jsxs("span",{className:"absolute right-0 h-full w-full rotate-45",children:[e.jsx("span",{className:`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!s.sidebarOpen&&"!h-0 !delay-[0]"}`}),e.jsx("span",{className:`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!s.sidebarOpen&&"!h-0 !delay-200"}`})]})]})}),e.jsx(j,{className:"block flex-shrink-0 lg:hidden",to:"/",children:e.jsx("img",{src:c1,alt:"Logo"})})]}),e.jsx("div",{className:"hidden sm:block",children:e.jsx("form",{})}),e.jsxs("div",{className:"flex items-center gap-3 2xsm:gap-7",children:[e.jsxs("ul",{className:"flex items-center gap-2 2xsm:gap-4",children:[e.jsx(x1,{}),e.jsx(m1,{})]}),e.jsx(p1,{})]})]})}),b1=t.lazy(()=>d(()=>import("./PageNotFound-a8160ecd.js"),["assets/PageNotFound-a8160ecd.js","assets/index-c0487efa.js","assets/index-906c1e23.css"])),v1=()=>{const[s,n]=t.useState(!1);return e.jsx("div",{className:"dark:bg-boxdark-2 dark:text-bodydark",children:e.jsxs("div",{className:"flex h-screen overflow-hidden",children:[e.jsx(A1,{sidebarOpen:s,setSidebarOpen:n}),e.jsxs("div",{className:"relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden",children:[e.jsx(f1,{sidebarOpen:s,setSidebarOpen:n}),e.jsx("main",{children:e.jsx("div",{className:"mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10",children:e.jsx(z,{children:e.jsxs(e.Fragment,{children:[o1.map(({path:r,index:a,element:l})=>e.jsx(w,{index:a,path:r,element:e.jsx(t.Suspense,{fallback:e.jsx(v,{}),children:e.jsx(l,{})})},r)),e.jsx(w,{path:"*",element:e.jsx(t.Suspense,{fallback:e.jsx(v,{}),children:e.jsx(b1,{})})})]})})})})]})]})})},j1=Object.freeze(Object.defineProperty({__proto__:null,default:v1},Symbol.toStringTag,{value:"Module"}));export{C1 as A,j1 as L};