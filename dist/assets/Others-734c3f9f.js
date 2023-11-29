import{R as l,j as t,n as g,E as b,L as x}from"./index-6ce4062c.js";import{C as y,g as j,a as f,b as P,d as w,S as C,s as u,P as k}from"./s3.util-703c0617.js";class m extends y{static getEndpointParameterInstructions(){return{Bucket:{type:"contextParams",name:"Bucket"},ForcePathStyle:{type:"clientContextParams",name:"forcePathStyle"},UseArnRegion:{type:"clientContextParams",name:"useArnRegion"},DisableMultiRegionAccessPoints:{type:"clientContextParams",name:"disableMultiregionAccessPoints"},Accelerate:{type:"clientContextParams",name:"useAccelerateEndpoint"},UseGlobalEndpoint:{type:"builtInParams",name:"useGlobalEndpoint"},UseFIPS:{type:"builtInParams",name:"useFipsEndpoint"},Endpoint:{type:"builtInParams",name:"endpoint"},Region:{type:"builtInParams",name:"region"},UseDualStack:{type:"builtInParams",name:"useDualstackEndpoint"}}}constructor(n){super(),this.input=n}resolveMiddleware(n,a,o){this.middlewareStack.use(j(a,this.serialize,this.deserialize)),this.middlewareStack.use(f(a,m.getEndpointParameterInstructions()));const c=n.concat(this.middlewareStack),{logger:e}=a,p={logger:e,clientName:"S3Client",commandName:"ListObjectsV2Command",inputFilterSensitiveLog:r=>r,outputFilterSensitiveLog:r=>r,[C]:{service:"AmazonS3",operation:"ListObjectsV2"}},{requestHandler:h}=a;return c.resolve(r=>h.handle(r.request,o||{}),p)}serialize(n,a){return P(n,a)}deserialize(n,a){return w(n,a)}}const E=/image\/(png|jpg|jpeg|webp)/i,S=()=>{const[d,n]=l.useState("");l.useEffect(()=>{o()},[]);const a=async e=>{if(e.target.files){if(!e.target.files[0].type.match(E))return g(b.error,"Chỉ cho phép up ảnh định dạng .png, .jpg, .jpeg, .webp!","error");await c(e.target.files[0])}},o=async()=>{try{const e=new m({Bucket:"bicycle-vuong-phat",Prefix:"banner"}),s=await u.send(e);if(!s||!s.Contents)throw Error("Can not find image object!");const i=s.Contents[s.Contents.length-1].Key;n(i)}catch(e){n(""),console.error(e)}},c=async e=>{try{const s="banner/"+new Date().getTime()+e.name,i=new k({Bucket:"bicycle-vuong-phat",Key:s,Body:e});if((await u.send(i)).$metadata.httpStatusCode!==200)throw new Error("Upload ảnh không thành công, vui lòng thử lại!");n(s)}catch(s){console.error(s)}};return t.jsxs("div",{className:"space-y-10 mb-6",children:[t.jsx("div",{className:"w-full inline-flex items-center justify-between",children:t.jsx("h4",{className:"text-xl font-semibold text-black dark:text-white",children:"BANNER"})}),t.jsxs("div",{className:"flex flex-col items-center space-y-2",children:[t.jsxs("label",{htmlFor:"upload-banner",children:[t.jsx("img",{src:d&&`https://d2uw95hyyeoa8w.cloudfront.net/${d}`,className:"w-full cursor-pointer",alt:"app-banner"}),t.jsx("input",{type:"file",onChange:a,id:"upload-banner",className:"sr-only"})]}),t.jsx("p",{className:"text-xs sm:text-xl text-meta-1 italic",children:"* Click vào ảnh để upload banner cho app"})]})]})},v=()=>t.jsx("section",{className:`rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark`,children:t.jsx(l.Suspense,{fallback:t.jsx(x,{}),children:t.jsx(S,{})})});export{v as default};