import{u as v,a as S,b as L,c as T,d as p,l as b,s as x,e as q,n,E as c,j as e,L as A,f as M,r as F,g as E,h as f}from"./index-60b3b8d9.js";import{u as D}from"./index.esm-27984c74.js";import{u as I,a as U,l as Z,c as B}from"./base-cdc4e6f0.js";import{g as K}from"./user.query-a8cd7813.js";const Y=()=>{var m,h;const g=v(),d=S(),t=L(s=>s.auth),r=T(),{register:l,handleSubmit:k,formState:{errors:a}}=D(),y=((h=(m=g.state)==null?void 0:m.from)==null?void 0:h.pathname)??"/";t.isAuth&&t.user&&d(y,{replace:!0});const{isFetching:o,data:u,isSuccess:C}=I({queryKey:["userInfo"],queryFn:()=>K(),enabled:t.isAuth});C&&(u.success?r(x(u.data.user)):(r(p()),r(b(!1)),r(x(null)),q(),n(c.error,"Không thể đăng nhập tài khoản. Vui lòng thử lại!")));const{mutate:N,isLoading:i}=U(Z,{onSuccess:s=>{s.success?(f("accessToken",s.data.accessToken),f("refreshToken",s.data.refreshToken),r(b(!0)),n(c.success,"Đăng nhập thành công với quyền admin!","success")):(r(p()),d("/auth/login",{replace:!0}),n(c.error,s.message,"error"))}}),j=async s=>{await F();const w={...s,deviceToken:E(B.cache.deviceToken)};N(w)};return i||o?e.jsx(A,{}):e.jsx("section",{className:"w-full h-screen flex justify-center items-center bg-gray-200",children:e.jsxs("div",{className:"w-[80%] sm:w-[50%] lg:max-w-[40%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"border-b border-stroke py-4 px-6.5 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-center text-black dark:text-white",children:"BICYCLE - Dashboard"})}),e.jsx("form",{onSubmit:k(j),children:e.jsxs("div",{className:"p-6.5",children:[e.jsxs("div",{className:"mb-4.5",children:[e.jsx("label",{className:"mb-2.5 block text-black dark:text-white",children:"Số điện thoại"}),e.jsx("input",{...l("phoneNumber",{required:"SĐT không được bỏ trống!",validate:s=>Number(s)>=0}),type:"text",placeholder:"Nhập số điện thoại",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),a.phoneNumber&&e.jsxs("p",{className:"mt-2 text-xs text-meta-1 italic",children:["* ",a.phoneNumber.message]})]}),e.jsxs("div",{className:"mb-4.5",children:[e.jsx("label",{className:"mb-2.5 block text-black dark:text-white",children:"Mật khẩu"}),e.jsx("input",{...l("password",{required:"Mật khẩu không được bỏ trống!"}),type:"password",placeholder:"Nhập mật khẩu",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),a.password&&e.jsxs("p",{className:"mt-2 text-xs text-meta-1 italic",children:["* ",a.password.message]})]}),e.jsxs("button",{type:"submit",disabled:i??o,className:"flex w-full justify-center items-center rounded bg-primary p-3 font-medium text-gray",children:[e.jsxs("svg",{className:M("w-4 h-4 mr-3",{"animate-spin":i??o}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Đăng nhập"]})]})})]})})};export{Y as default};
