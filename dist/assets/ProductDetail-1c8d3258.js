import{R as p,_ as Z,O as _,a as O,b as E,c as F,U as N,j as e,L as C,n as o,E as m,d as K,V as L,W as U}from"./index-95d1d18e.js";import{u as A,a as J,T as Y,g as $,b as G}from"./product.mutation-fae54679.js";import{u as Q,F as W}from"./index.esm-d40728a3.js";import{g as X}from"./category.query-af01f35c.js";import{a as ee,q as k}from"./base-8b1c670a.js";import{g as se}from"./product.query-258ef132.js";import"./index-0f400e7e.js";const ae=p.lazy(()=>Z(()=>import("./ProductVariant-027b8625.js"),["assets/ProductVariant-027b8625.js","assets/index-95d1d18e.js","assets/index-4a55959a.css","assets/index.esm-d40728a3.js"])),oe=()=>{var v,y;const{id:V}=_(),f=O(),n=E(s=>s.product),c=F(),[u,w]=p.useState([]),I=p.useCallback(s=>{s!=null&&s.length&&w(i=>[...i,...s.map(r=>Object.assign(r,{preview:URL.createObjectURL(r)}))])},[]),{getRootProps:M,getInputProps:S}=A({onDrop:I,accept:{"image/*":[]}}),D=s=>c(L({type:"previewImage",payload:s})),z=s=>w(u.filter((i,r)=>r!==s)),a=Q(),B=s=>a.setValue("detail",s),T=()=>c(U({type:"detailVariant",payload:Math.max(...n.detailVariantList)+1})),q=s=>{if(n.detailVariantList.length===1)return o(m.warning,"Không thể xoá!","warning");c(L({type:"detailVariant",payload:s}))},[t,d,b]=J({queries:[{queryKey:["product"],queryFn:()=>se(Number(V)),cacheTime:0},{queryKey:["categories"],queryFn:()=>X()},{queryKey:["sizes"],queryFn:()=>$()}]});p.useEffect(()=>{if(t.data){const s=[];t.data.productItem.forEach((i,r)=>s.push(r)),Promise.all([c(N({type:"detailVariant",payload:s})),c(N({type:"previewImage",payload:t.data.images}))])}},[t.data]);const h=d.data&&((v=d.data.categories.filter(s=>{var i;return s.id===((i=t.data)==null?void 0:i.categoryId)})[0])==null?void 0:v.subCategories),g=d.data&&((y=d.data.categories.filter(s=>s.id===Number(a.watch("categoryId")))[0])==null?void 0:y.subCategories),{mutate:P,isLoading:j}=ee(G,{onSuccess:s=>{s.success?(o(m.success,"Cập nhật sản phẩm thành công!","success","top-center"),f("/product",{replace:!0})):o(m.error,s.message,"error","top-center")}}),H=async s=>{const{productVariants:i,...r}=s,l=new FormData;if(l.append("name",r.name),l.append("categoryId",r.categoryId),l.append("subCategoryId",r.subCategoryId),l.append("productVariants",JSON.stringify(i)),l.append("discount",r.discount),l.append("video",r.video),l.append("images",JSON.stringify(n.previewImageList)),u.length>0)for(let x of u)l.append("newImages",x);l.append("detail",r.detail),P({id:t.data.id,payload:l})};return t.isError&&f(-1),t.isLoading||d.isLoading||b.isLoading?e.jsx(C,{}):e.jsxs("form",{onSubmit:async s=>{var r;if(s.preventDefault(),!await a.trigger())for(let l in a.formState.errors){if(l==="productVariants")for(let x of a.formState.errors[l])for(let R in x)return o(m.error,x[R].message);return o(m.error,(r=a.formState.errors[l])==null?void 0:r.message)}a.handleSubmit(H)()},children:[e.jsxs("h1",{className:"mb-6 text-xl",children:["Sản phẩm ",">"," Thêm sản phẩm"]}),e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Tên"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("input",{...a.register("name",{required:"Tên danh mục không được bỏ trống!"}),type:"text",placeholder:"Tên sản phẩm",defaultValue:t.data.name,className:"w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"w-full sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Danh mục"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsxs("div",{className:"w-full sm:w-[70%] inline-flex justify-between items-center",children:[e.jsxs("div",{className:"w-full sm:w-[45%] relative z-20 dark:bg-form-input",children:[e.jsxs("select",{className:"relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",defaultValue:t.data.categoryId,...a.register("categoryId",{required:"Danh mục không được bỏ trống!",min:{value:1,message:"Danh mục không được bỏ trống!"}}),children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn danh mục"}),d.data.categories.length>0&&d.data.categories.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx("span",{className:"absolute top-1/2 right-4 z-10 -translate-y-1/2",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{opacity:"0.8",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]}),e.jsx("svg",{width:"34",height:"8",viewBox:"0 0 34 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M33.3536 4.35355C33.5488 4.15829 33.5488 3.84171 33.3536 3.64645L30.1716 0.464466C29.9763 0.269204 29.6597 0.269204 29.4645 0.464466C29.2692 0.659728 29.2692 0.976311 29.4645 1.17157L32.2929 4L29.4645 6.82843C29.2692 7.02369 29.2692 7.34027 29.4645 7.53553C29.6597 7.7308 29.9763 7.7308 30.1716 7.53553L33.3536 4.35355ZM0 4.5H33V3.5H0V4.5Z",fill:"#656565"})}),e.jsxs("div",{className:"w-full sm:w-[45%] relative z-20 dark:bg-form-input",children:[e.jsxs("select",{className:"relative w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",defaultValue:t.data.subCategoryId,...a.register("subCategoryId",{required:"Danh mục con không được bỏ trống!",min:{value:1,message:"Danh mục con không được bỏ trống!"}}),children:[e.jsx("option",{value:"",disabled:!0,children:"Chọn danh mục con"}),a.watch("categoryId")?g&&g.length>0&&g.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id)):h&&h.length>0&&h.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx("span",{className:"absolute top-1/2 right-4 z-10 -translate-y-1/2",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{opacity:"0.8",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",fill:"#637381"})})})})]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Thuộc tính"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("div",{className:"w-full sm:w-[70%] text-sm z-20 dark:bg-form-input",children:e.jsx(W,{...a,children:n.detailVariantList.length>0&&n.detailVariantList.map(s=>e.jsx(p.Suspense,{fallback:e.jsx(C,{}),children:e.jsxs("div",{className:"relative w-full",children:[e.jsx(ae,{index:s,defaultValues:t.data.productItem,sizes:b.data}),e.jsx("button",{type:"button",className:"absolute -right-2 -top-2",onClick:()=>q(s),children:e.jsx("svg",{className:"w-5 h-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"#FF6055",children:e.jsx("path",{d:"M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41"})})})]})},s))})})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]"}),e.jsx("div",{className:"w-full sm:w-[70%] text-sm z-20 dark:bg-form-input",children:e.jsx("button",{type:"button",className:"font-bold cursor-pointer",onClick:T,children:"Thêm thuộc tính +"})})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsx("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:e.jsx("span",{children:"% khuyến mãi"})})}),e.jsxs("div",{className:"w-full sm:w-[25%] inline-flex items-center space-x-2",children:[e.jsx("input",{...a.register("discount",{min:{value:0,message:"Giá phải lớn hơn 0"}}),type:"number",placeholder:"Nhập giá",defaultValue:t.data.discount,min:0,className:"rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("p",{children:"%"})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Video"}),e.jsx("span",{className:"text-meta-1"})]})}),e.jsx("input",{...a.register("video"),type:"text",placeholder:"Link youtube",defaultValue:t.data.video,className:"w-full sm:w-[70%] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),a.watch("video")?e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Video preview"}),e.jsx("span",{className:"text-meta-1"})]})}),e.jsx("div",{className:"w-full sm:w-[70%]",children:e.jsx("iframe",{width:"100%",height:"315",src:`https://youtube.com/embed/${Object.values(k.parse(a.getValues("video")))[0]}`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})})]}):t.data.video&&e.jsxs("div",{className:"w-full sm:inline-flex items-center",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Video preview"}),e.jsx("span",{className:"text-meta-1"})]})}),e.jsx("div",{className:"w-full sm:w-[70%]",children:e.jsx("iframe",{width:"100%",height:"315",src:`https://youtube.com/embed/${Object.values(k.parse(t.data.video))[0]}`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})})]}),e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Hình ảnh"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsxs("div",{className:"w-full sm:w-[70%] inline-flex space-x-4",children:[n.previewImageList.length>0&&n.previewImageList.map((s,i)=>e.jsxs("div",{...a.register("images",{value:n.previewImageList}),className:"relative",children:[e.jsx("svg",{className:"absolute w-6 h-6 fill-danger -top-3 -right-3 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",onClick:()=>D(i),children:e.jsx("path",{d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"})}),e.jsx("img",{className:"w-20 h-20 object-cover",src:s,alt:"preview-old-image"})]},i)),u.map((s,i)=>e.jsxs("div",{className:"relative",children:[e.jsx("svg",{className:"absolute w-6 h-6 fill-danger -top-3 -right-3 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",onClick:()=>z(i),children:e.jsx("path",{d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"})}),e.jsx("img",{className:"w-20 h-20 object-cover",src:s.preview,alt:"preview-image"})]},i)),e.jsx("label",{...M({className:"dropzone"}),className:"bg-[#D9D9D9] rounded-lg",children:e.jsx("div",{className:"flex justify-center items-center box-border h-20 w-20 cursor-pointer",children:e.jsx("svg",{className:"w-10 h-10","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"})})})}),e.jsx("input",{...S()})]})]}),e.jsxs("div",{className:"w-full sm:inline-flex",children:[e.jsx("div",{className:"sm:w-[30%]",children:e.jsxs("label",{className:"inline-flex space-x-2 text-black dark:text-white",children:[e.jsx("span",{children:"Mô tả"}),e.jsx("span",{className:"text-meta-1",children:"*"})]})}),e.jsx("div",{className:"w-full sm:w-[70%]",children:e.jsx(Y,{initContent:t.data.detail,getContent:B})})]})]}),e.jsxs("div",{className:"w-full mt-6 justify-end inline-flex space-x-8",children:[e.jsx("button",{type:"button",className:"inline-flex items-center justify-center rounded-md bg-[#B6B6B6] py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10",children:"Huỷ"}),e.jsxs("button",{type:"submit",disabled:j,className:"inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",children:[e.jsxs("svg",{className:K("w-4 h-4 mr-3",{"animate-spin":j}),viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),"Cập nhật sản phẩm"]})]})]})};export{oe as default};