import{k as g,g as b,O as y,a as N,R as C,j as e,L as v,M as n,d as S,n as o,E as d}from"./index-034600bc.js";import{E as x}from"./order.type-e78449c3.js";import{g as w}from"./order.query-81b2d195.js";import{c as m,u as k,a as O}from"./base-9adaf921.js";const L=async a=>{const{id:l,status:c}=a;return await g(`${m.endpoint}/order/${l}`,JSON.stringify({status:c}),{Authorization:`Bearer ${b(m.cache.accessToken)}`})},R=()=>{const{id:a}=y(),l=N(),[c,h]=C.useState(),{data:s,isLoading:i,isError:u}=k({queryKey:["order",{id:a}],queryFn:()=>w(Number(a))}),{mutate:j,isLoading:p}=O(L,{onSuccess:t=>{t.success?(o(d.success,t.message),l("/",{replace:!0})):o(d.error,t.message)}}),f=()=>{if(!c)return o(d.error,"Chọn trạng thái đơn hàng!");j({id:a,status:Object.keys(x)[Object.values(x).indexOf(c)]})};return u&&l(-1),i?e.jsx(v,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-6 flex justify-between items-center",children:[e.jsxs("h1",{className:"text-xl",children:["Đơn hàng ",">"," ",s==null?void 0:s.codeOrder]}),e.jsx("button",{type:"button",onClick:()=>l(`/order/invoice/${s==null?void 0:s.id}`),className:"text-sm text-meta-5 underline",children:"Xuất thông tin đơn hàng"})]}),e.jsxs("table",{className:"mb-4 min-w-full border-separate divide-x divide-y",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-left text-sm font-bold table-cell",children:"Mã sản phẩm"}),e.jsx("th",{scope:"col",colSpan:4,className:"py-3.5 text-left text-sm font-bold table-cell",children:"Sản phẩm"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-center text-sm font-bold table-cell",children:"Số lượng"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-center text-sm font-bold table-cell",children:"Đơn giá"}),e.jsx("th",{scope:"col",colSpan:1,className:"py-3.5 text-right text-sm font-bold table-cell",children:"Thành tiền"})]})}),e.jsx("tbody",{children:s.products.map((t,r)=>e.jsxs("tr",{children:[e.jsx("td",{colSpan:1,className:"py-3.5 text-xs text-left table-cell",children:t.productVariantId}),e.jsx("td",{colSpan:4,className:"py-3.5 text-xs text-left table-cell",children:e.jsxs("div",{className:"inline-flex items-center gap-2",children:[e.jsx("img",{src:t.image,className:"w-16 h-16 rounded-lg",alt:"user-image"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{children:t.name}),e.jsxs("p",{children:[t.size," - ",t.color]})]})]})}),e.jsx("td",{colSpan:1,className:"py-3.5 text-xs text-center table-cell",children:t.quantity}),e.jsxs("td",{colSpan:1,className:"py-3.5 text-xs text-center table-cell",children:["đ",n(t.price)]}),e.jsxs("td",{colSpan:1,className:"py-3.5 text-xs text-right table-cell",children:["đ",n(t.totalPrice)]})]},r))}),e.jsxs("tfoot",{children:[e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-bold text-right table-cell",children:"Tổng cộng"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-right font-bold",children:["đ",n(s.totalPrice)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Vận chuyển"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm font-bold text-right",children:["đ",n(s.priceDelivery)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Khuyến mãi"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-meta-1 text-right font-bold",children:["-đ",n(s.pricePromotion)]})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",colSpan:7,className:"pt-3.5 text-sm font-light text-right table-cell",children:"Doanh thu"}),e.jsxs("td",{colSpan:10,className:"pt-3.5 text-sm text-meta-1 text-right font-bold",children:["đ",n(s.finalPrice)]})]})]})]}),e.jsxs("div",{className:"inline-flex items-center space-x-4",children:[e.jsx("h3",{className:"font-bold",children:"Cập nhật vận chuyển"}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{className:"appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",defaultValue:"",onChange:t=>h(t.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn trạng thái"}),Object.entries(x).map(([t,r])=>e.jsx("option",{value:r,children:r},t))]}),e.jsx("span",{className:"absolute top-1/2 right-4 z-10 -translate-y-1/2",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{opacity:"0.8",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]})]}),e.jsxs("div",{className:"w-full mt-20 justify-end inline-flex space-x-8",children:[e.jsx("button",{type:"button",onClick:()=>l(-1),className:"inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10",children:"Trở về"}),e.jsxs("button",{type:"button",onClick:f,disabled:i||p,className:"inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",children:[e.jsxs("svg",{className:S("w-4 h-4 mr-3",{"animate-spin":i||p}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Xác nhận"]})]})]})};export{R as default};