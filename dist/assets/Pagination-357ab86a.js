import{u as g,a as y,j as r,d as o}from"./index-f0192990.js";const n=5,m=({page:e,limit:d,total:h})=>{const s=Math.ceil(h/d),{search:c}=g(),x=y(),l=new URLSearchParams(c),i=t=>{t>1?l.set("page",t.toString()):l.delete("page"),x({search:l.toString()})};return r.jsx("nav",{"aria-label":"Page navigation example",children:r.jsxs("ul",{className:"flex items-center -space-x-px h-8 text-sm",children:[r.jsx("li",{children:r.jsxs("button",{disabled:e===1,onClick:()=>i(e-1),className:"flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[r.jsx("span",{className:"sr-only",children:"Previous"}),r.jsx("svg",{className:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:r.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 1 1 5l4 4"})})]})}),e>n&&r.jsx("li",{className:"px-3",children:"..."}),e>5?[...Array(s).keys()].slice(e-n,e).map((t,a)=>r.jsx("li",{children:r.jsx("button",{disabled:e===t+1,onClick:()=>i(t+1),className:o("flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",{"bg-primary text-white rounded-full":e===t+1,"text-gray-500":e!==t+1}),children:t+1})},t)):[...Array(s).keys()].slice(0,n).map((t,a)=>r.jsx("li",{children:r.jsx("button",{disabled:e===a+1,onClick:()=>i(a+1),className:o("flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",{"bg-primary text-white rounded-full":e===a+1,"text-gray-500":e!==a+1}),children:a+1})},a+1)),e>n&&e<s&&r.jsx("li",{className:"px-3",children:"..."}),r.jsx("li",{children:r.jsxs("button",{disabled:e===s,onClick:()=>i(e+1),className:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[r.jsx("span",{className:"sr-only",children:"Next"}),r.jsx("svg",{className:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:r.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"m1 9 4-4-4-4"})})]})})]})})};export{m as P};
