import{R as o,_ as z,a as B,b as T,c as H,j as e,L as j,n as l,E as d,d as I,V as R,U as q}from"./index-92583948.js";import{u as _,a as P,T as Z,g as E,c as F}from"./product.mutation-e4f379c9.js";import{u as O,F as A}from"./index.esm-c1bb49f9.js";import{g as K}from"./category.query-cc31c2c9.js";import{a as U,q as G}from"./base-379c537c.js";import"./index-dde3fc38.js";const J=o.lazy(()=>z(()=>import("./ProductVariant-25e8d659.js"),["assets/ProductVariant-25e8d659.js","assets/index-92583948.js","assets/index-3972d14f.css","assets/index.esm-c1bb49f9.js"])),se=()=>{var b;const w=B(),m=T(s=>s.product),h=H(),[p,u]=o.useState([]),v=o.useCallback(s=>{s!=null&&s.length&&u(i=>[...i,...s.map(r=>Object.assign(r,{preview:URL.createObjectURL(r)}))])},[]),{getRootProps:y,getInputProps:N}=_({onDrop:v,accept:{"image/*":[]}}),k=s=>u(p.filter((i,r)=>r!==s)),a=O(),C=s=>a.setValue("detail",s),L=()=>h(R({type:"variant",payload:Math.max(...m.variantList)+1})),V=s=>{if(m.variantList.length===1)return l(d.warning,"Không thể xoá!","warning");h(q({type:"variant",payload:s}))},M=async s=>{const{productVariants:i,...r}=s,t=new FormData;t.append("name",r.name),t.append("categoryId",r.categoryId),t.append("subCategoryId",r.subCategoryId),t.append("productVariants",JSON.stringify(i)),t.append("discount",r.discount),t.append("video",r.video);for(let c of p)t.append("images",c);t.append("detail",r.detail),D(t)},[n,f]=P({queries:[{queryKey:["categories"],queryFn:()=>K()},{queryKey:["sizes"],queryFn:()=>E()}]}),x=n.data&&((b=n.data.categories.filter(s=>s.id===Number(a.watch("categoryId")))[0])==null?void 0:b.subCategories),{mutate:D,isLoading:g}=U(F,{onSuccess:s=>{s.success?(l(d.success,"Tạo mới sản phẩm thành công!","success","top-center"),w("/product")):l(d.error,s.message,"error","top-center")}});return n.isLoading||f.isLoading?e.jsx(j,{}):e.jsxs("form",{onSubmit:async s=>{var r;if(s.preventDefault(),!await a.trigger())for(let t in a.formState.errors){if(t==="productVariants")for(let c of a.formState.errors[t])for(let S in c)return l(d.error,c[S].message);return l(d.error,(r=a.formState.errors[t])==null?void 0:r.message)}a.handleSubmit(M)()},children:[e.jsxs("h1",{className:"mb-6 text-xl",children:["Sản phẩm ",">"," Thêm sản phẩm"]}),e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Tên"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("input",{...a.register("name",{required:"Tên danh mục không được bỏ trống!"}),type:"text",placeholder:"Tên sản phẩm",className:"w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"w-full sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Danh mục"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsxs("div",{className:"w-full sm:w-[70%] inline-flex justify-between items-center",children:[e.jsxs("div",{className:"w-full sm:w-[45%] relative z-20 dark:bg-form-input",children:[e.jsxs("select",{className:"relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",defaultValue:"",...a.register("categoryId",{required:"Danh mục không được bỏ trống!",min:{value:1,message:"Danh mục không được bỏ trống!"}}),children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn danh mục"}),n.data.categories.length>0&&n.data.categories.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx("span",{className:"absolute top-1/2 right-4 z-10 -translate-y-1/2",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{opacity:"0.8",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]}),e.jsx("svg",{width:"34",height:"8",viewBox:"0 0 34 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M33.3536 4.35355C33.5488 4.15829 33.5488 3.84171 33.3536 3.64645L30.1716 0.464466C29.9763 0.269204 29.6597 0.269204 29.4645 0.464466C29.2692 0.659728 29.2692 0.976311 29.4645 1.17157L32.2929 4L29.4645 6.82843C29.2692 7.02369 29.2692 7.34027 29.4645 7.53553C29.6597 7.7308 29.9763 7.7308 30.1716 7.53553L33.3536 4.35355ZM0 4.5H33V3.5H0V4.5Z",fill:"#656565"})}),e.jsxs("div",{className:"w-full sm:w-[45%] relative z-20 dark:bg-form-input",children:[e.jsxs("select",{className:"relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",defaultValue:"",...a.register("subCategoryId",{required:"Danh mục con không được bỏ trống!",min:{value:1,message:"Danh mục con không được bỏ trống!"}}),children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn danh mục con"}),x&&x.length>0&&x.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx("span",{className:"absolute top-1/2 right-4 z-10 -translate-y-1/2",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{opacity:"0.8",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Thuộc tính"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("div",{className:"w-full sm:w-[70%] text-sm z-20 dark:bg-form-input",children:e.jsx(A,{...a,children:m.variantList.map((s,i)=>e.jsx(o.Suspense,{fallback:e.jsx(j,{}),children:e.jsxs("div",{className:"relative w-full",children:[e.jsx(J,{index:s,sizes:f.data}),e.jsx("button",{type:"button",className:"absolute -right-2 -top-2",onClick:()=>V(s),children:e.jsx("svg",{className:"w-5 h-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"#FF6055",children:e.jsx("path",{d:"M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41"})})})]})},s))})})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]"}),e.jsx("div",{className:"w-full sm:w-[70%] text-sm z-20 dark:bg-form-input",children:e.jsx("button",{type:"button",className:"font-bold cursor-pointer",onClick:L,children:"Thêm thuộc tính +"})})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsx("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:e.jsx("span",{children:"% khuyến mãi"})})}),e.jsxs("div",{className:"w-full sm:w-[25%] inline-flex items-center space-x-2",children:[e.jsx("input",{...a.register("discount",{min:{value:0,message:"Giá phải lớn hơn 0"}}),type:"number",placeholder:"Nhập giá",defaultValue:"0",min:0,className:"rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("p",{children:"%"})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Video"}),e.jsx("span",{className:"text-meta-1"})]})}),e.jsx("input",{...a.register("video"),type:"text",placeholder:"Link youtube",className:"w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),a.watch("video")&&e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Video preview"}),e.jsx("span",{className:"text-meta-1"})]})}),e.jsx("div",{className:"w-full sm:w-[70%]",children:e.jsx("iframe",{width:"100%",height:"315",src:`https://youtube.com/embed/${Object.values(G.parse(a.getValues("video")))[0]}`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})})]}),e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Hình ảnh"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsxs("div",{className:"inline-flex space-x-4",children:[p.map((s,i)=>e.jsxs("div",{className:"relative",children:[e.jsx("svg",{className:"absolute w-6 h-6 fill-danger -top-3 -right-3 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",onClick:()=>k(i),children:e.jsx("path",{d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"})}),e.jsx("img",{className:"w-20 h-20 object-cover",src:s==null?void 0:s.preview,alt:"preview-image"})]},i)),e.jsx("label",{...y({className:"dropzone"}),className:"bg-[#D9D9D9] rounded-lg",children:e.jsx("button",{type:"button",className:"flex justify-center items-center box-border h-20 w-20",children:e.jsx("svg",{className:"w-10 h-10","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})})}),e.jsx("input",{...N()})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Mô tả"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("div",{className:"w-full sm:w-[70%]",children:e.jsx(Z,{getContent:C})})]})]}),e.jsxs("div",{className:"w-full mt-6 justify-end inline-flex space-x-8",children:[e.jsx("button",{type:"button",className:"inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10",children:"Huỷ"}),e.jsxs("button",{type:"submit",disabled:g,className:"inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",children:[e.jsxs("svg",{className:I("w-4 h-4 mr-3",{"animate-spin":g}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Đăng sản phẩm"]})]})]})};export{se as default};
