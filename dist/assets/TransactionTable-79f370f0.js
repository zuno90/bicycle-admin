import{i as P,g as v,k as A,u as M,a as E,b as T,c as D,m as q,j as e,L as $,d as r,p as I,M as y,P as j,n as N,E as k,e as X}from"./index-95d1d18e.js";import{P as G}from"./Pagination-be4b2421.js";import{M as K}from"./Modal-76e5c912.js";import{q as O,c as o,a as Q,u as z}from"./base-8b1c670a.js";var F=(n=>(n.all="Tất cả",n.pending="Chờ xử lý",n.success="Đã xác nhận",n.canceled="Đã huỷ",n))(F||{});const H=async(n,d,l)=>{const c=O.stringify({page:n,limit:d,status:l},{skipNull:!0,skipEmptyString:!0}),i=await P(`${o.endpoint}/payments?${c}`,{Authorization:`Bearer ${v(o.cache.accessToken)}`});if(i.success)return i.data},R=async n=>{const{id:d,statusPayment:l}=n;return await A(`${o.endpoint}/payment/${d}`,JSON.stringify({statusPayment:l}),{Authorization:`Bearer ${v(o.cache.accessToken)}`})},W=({title:n})=>{const{search:d}=M(),l=E(),c=T(t=>t.common),i=D(),w=q(),s=new URLSearchParams(d),x=Number(s.get("page"))||o.pagination.PAGE,m=Number(s.get("limit"))||o.pagination.LIMIT,g=s.get("status"),{mutate:p,isLoading:f}=Q(R,{onSuccess:t=>{t.success?(i(X()),w.invalidateQueries({queryKey:["transactions",{page:x,limit:m,status:g}]}),N(k.success,"Xác nhận giao dịch thành công!")):N(k.error,"Xảy ra lỗi! Không thể xác nhận giao dịch!")}}),{data:a,isLoading:C}=z({queryKey:["transactions",{page:x,limit:m,status:g}],queryFn:()=>H(x,m,g)}),b=a&&a.totalStatusPayment[s.get("status")??"all"],u=t=>{s.delete("page"),s.delete("limit"),t==="all"?s.delete("status"):s.set("status",t),l({search:s.toString()})},h=()=>i(j(!1)),S=()=>{var t;return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("p",{children:"Vui lòng xác nhận số tiền nhận được tại đây"}),e.jsxs("div",{className:"py-8 bg-gray text-2xl font-semibold rounded-lg",children:["đ"," ",y(a&&((t=a.payments)==null?void 0:t.filter(B=>B.id===c.modalId)[0].amount))]})]})},L=()=>e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",disabled:f,className:"inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{h(),p({id:c.modalId,statusPayment:"canceled"})},children:"Huỷ giao dịch"}),e.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-[#FBE69E] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#FFC700] hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{h(),l("/chat?uid=2")},children:"Nhắn tin"}),e.jsx("button",{type:"button",disabled:f,className:"inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{h(),p({id:c.modalId,statusPayment:"success"})},children:"Xác nhận"})]});return C?e.jsx($,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"space-y-10 mb-4",children:[e.jsx("div",{className:"w-full inline-flex items-center justify-between",children:e.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:n})}),e.jsxs("div",{className:"inline-flex items-center gap-4",children:[e.jsxs("button",{onClick:()=>u("all"),type:"button",className:r("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":!s.get("status")}),children:["Tất cả (",a.totalStatusPayment.all,")"]}),e.jsxs("button",{onClick:()=>u("pending"),type:"button",className:r("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":s.get("status")==="pending"}),children:["Chờ xử lý (",a.totalStatusPayment.pending,")"]}),e.jsxs("button",{onClick:()=>u("success"),type:"button",className:r("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":s.get("status")==="success"}),children:["Đã xác nhận (",a.totalStatusPayment.success,")"]}),e.jsxs("button",{onClick:()=>u("canceled"),type:"button",className:r("text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",{"bg-[#FBE69E]":s.get("status")==="canceled"}),children:["Đã huỷ (",a.totalStatusPayment.canceled,")"]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-9 border-stroke py-4 dark:border-strokedark sm:grid-cols-9",children:[e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm font-bold xsm:text-base",children:"ID"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Ngày"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Tên"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Số điện thoại"})}),e.jsx("div",{className:"col-span-2",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Nội dung"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Số tiền"})}),e.jsx("div",{className:"col-span-1",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Trạng thái"})}),e.jsx("div",{className:"col-span-1 text-center",children:e.jsx("h5",{className:"text-sm text-center font-bold xsm:text-base",children:"Hành động"})})]}),a.payments.length>0&&a.payments.map(t=>e.jsxs("div",{className:r("grid grid-cols-9 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-9"),children:[e.jsx(I,{to:`/transaction/${t.id}`,className:"col-span-1 flex items-center",children:e.jsx("p",{className:"text-xs text-black dark:text-white",children:t.paymentCode})}),e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsx("p",{className:"text-xs font-semibold text-center text-black dark:text-white text-ellipsis overflow-hidden",children:new Date(t.createAt).toLocaleDateString("en-GB")})}),e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsx("p",{className:"text-xs text-center text-black dark:text-white",children:t.user.name})}),e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsx("p",{className:"text-xs text-center text-black dark:text-white",children:t.user.phoneNumber})}),e.jsx("div",{className:"col-span-2 flex justify-center items-center",children:e.jsx("p",{className:"text-xs text-left text-black dark:text-white",children:t.content})}),e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsxs("p",{className:"text-xs text-center text-black dark:text-white",children:["đ",y(t.amount)]})}),e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsx("p",{className:r("text-xs text-center text-black dark:text-white",{"text-meta-1":t.status==="pending","text-success":t.status==="success","text-warning":t.status==="canceled"}),children:F[t.status]})}),t.status==="pending"&&e.jsx("div",{className:"col-span-1 flex justify-center items-center",children:e.jsx("button",{type:"button",onClick:()=>i(j({id:t.id,isOpen:!0})),children:e.jsx("svg",{className:"fill-current",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M8.6,16.6L13.2,12L8.6,7.4L10,6L16,12L10,18L8.6,16.6Z"})})})})]},t.id)),b>0&&e.jsx("div",{className:"flex justify-center items-center my-4",children:e.jsx(G,{page:x,limit:m,total:b})}),c.isOpenModal&&e.jsx(K,{title:"Xác nhận giao dịch",body:e.jsx(S,{}),footer:e.jsx(L,{}),close:h})]})]})};export{W as default};
