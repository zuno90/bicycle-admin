import{k as M,g as B,O,a as k,b as D,c as F,R as T,j as e,L as P,M as c,d as p,P as f,e as E,n as b,E as y}from"./index-95d1d18e.js";import{E as n}from"./order.type-e78449c3.js";import{g as Z}from"./order.query-4d994619.js";import{c as C,u as L,a as $}from"./base-8b1c670a.js";import{M as N}from"./Modal-76e5c912.js";const q=async a=>{const{id:l,status:r}=a;return await M(`${C.endpoint}/order/${l}`,JSON.stringify({status:r}),{Authorization:`Bearer ${B(C.cache.accessToken)}`})},K=()=>{const{id:a}=O(),l=k(),r=D(s=>s.common),o=F(),[d,h]=T.useState(""),{data:t,isLoading:i,isError:S}=L({queryKey:["order",{id:a}],queryFn:()=>Z(Number(a))}),{mutate:v,isLoading:x}=$(q,{onSuccess:s=>{s.success?(b(y.success,s.message),l("/",{replace:!0})):b(y.error,s.message)}}),u=s=>{v({id:a,status:s})};console.log(t);const m=()=>o(E()),g=()=>d==="canceled"?e.jsx("p",{children:"Bạn muốn huỷ đơn hàng?"}):e.jsx("p",{children:"Bạn muốn cập nhật đơn hàng?"}),j=()=>e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:m,children:"Huỷ"}),e.jsx("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{u(d==="canceled"?"canceled":t.status),m()},children:"Xác nhận"})]});return S&&l(-1),i?e.jsx(P,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-6 flex justify-between items-center",children:[e.jsxs("h1",{className:"text-xl",children:["Đơn hàng ",">"," ",t==null?void 0:t.codeOrder]}),e.jsx("button",{type:"button",onClick:()=>l(`/order/invoice/${t==null?void 0:t.id}`),className:"text-sm text-meta-5 underline",children:"Xuất thông tin đơn hàng"})]}),e.jsxs("table",{className:"mb-4 min-w-full border-separate divide-x divide-y",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-left text-sm font-bold table-cell",children:"Mã sản phẩm"}),e.jsx("th",{scope:"col",colSpan:4,className:"py-3.5 text-left text-sm font-bold table-cell",children:"Sản phẩm"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-center text-sm font-bold table-cell",children:"Số lượng"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-center text-sm font-bold table-cell",children:"Đơn giá"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-right text-sm font-bold table-cell",children:"Thành tiền"})]})}),e.jsx("tbody",{children:t.products.map((s,w)=>e.jsxs("tr",{children:[e.jsx("td",{colSpan:1,className:"py-3.5 text-xs text-left table-cell",children:s.productVariantId}),e.jsx("td",{colSpan:4,className:"py-3.5 text-xs text-left table-cell",children:e.jsxs("div",{className:"inline-flex items-center gap-2",children:[e.jsx("img",{src:s.image,className:"w-16 h-16 rounded-lg",alt:"user-image"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{children:s.name}),e.jsxs("p",{children:[s.size," - ",s.color]})]})]})}),e.jsx("td",{colSpan:1,className:"py-3.5 text-xs text-center table-cell",children:s.quantity}),e.jsxs("td",{colSpan:1,className:"py-3.5 text-xs text-center table-cell",children:["đ",c(s.price)]}),e.jsxs("td",{colSpan:1,className:"py-3.5 text-xs text-right table-cell",children:["đ",c(s.totalPrice)]})]},w))}),e.jsxs("tfoot",{children:[e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-bold text-right table-cell",children:"Tổng cộng"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-right font-bold",children:["đ",c(t.totalPrice)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Vận chuyển"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm font-bold text-right",children:["đ",c(t.priceDelivery)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Khuyến mãi"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-meta-1 text-right font-bold",children:["-đ",c(t.pricePromotion)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Doanh thu"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-meta-1 text-right font-bold",children:["đ",c(t.finalPrice)]})]})]})]}),e.jsxs("div",{className:"inline-flex items-center space-x-4",children:[e.jsx("h3",{className:"font-bold",children:"Trạng thái đơn hàng"}),e.jsx("p",{className:p("",{"text-primary":n[t.status]===n.pending,"text-warning":n[t.status]===n.transported,"text-success":n[t.status]===n.success,"text-danger":n[t.status]===n.canceled}),children:n[t.status]})]}),e.jsxs("div",{className:"w-full mt-20 justify-end inline-flex space-x-8",children:[e.jsx("button",{type:"button",onClick:()=>l(-1),className:"inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10",children:"Trở về"}),t.status==="success"||t.status==="canceled"?e.jsx(e.Fragment,{}):e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:()=>{h("canceled"),o(f({id:t.id,isOpen:!0}))},disabled:i||x,className:"inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",children:[e.jsxs("svg",{className:p("w-4 h-4 mr-3",{"animate-spin":i||x}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Huỷ đơn"]}),e.jsxs("button",{type:"button",onClick:()=>{h("approval"),o(f({id:t.id,isOpen:!0}))},disabled:i||x,className:"inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",children:[e.jsxs("svg",{className:p("w-4 h-4 mr-3",{"animate-spin":i||x}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Xác nhận"]})]})]}),r.isOpenModal&&d==="canceled"&&e.jsx(N,{title:"Huỷ đơn",body:e.jsx(g,{}),footer:e.jsx(j,{}),close:m}),r.isOpenModal&&d==="approval"&&e.jsx(N,{title:"Cập nhật trạng thái đơn hàng",body:e.jsx(g,{}),footer:e.jsx(j,{}),close:m})]})};export{K as default};
