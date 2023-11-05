import{S as g,F as v,aj as y,ak as R,m as E,I as b}from"./index-47085293.js";import{Q as w,b as S,d as M,e as C,f as q,g as H,h as x,s as m,i as Q,w as B,j as U}from"./base-e6441cfb.js";class P extends g{constructor(r,i){super(),this.client=r,this.queries=[],this.result=[],this.observers=[],this.observersMap={},i&&this.setQueries(i)}onSubscribe(){this.listeners.size===1&&this.observers.forEach(r=>{r.subscribe(i=>{this.onUpdate(r,i)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,this.observers.forEach(r=>{r.destroy()})}setQueries(r,i){this.queries=r,v.batch(()=>{const n=this.observers,a=this.findMatchingObservers(this.queries);a.forEach(s=>s.observer.setOptions(s.defaultedQueryOptions,i));const t=a.map(s=>s.observer),c=Object.fromEntries(t.map(s=>[s.options.queryHash,s])),l=t.map(s=>s.getCurrentResult()),p=t.some((s,d)=>s!==n[d]);n.length===t.length&&!p||(this.observers=t,this.observersMap=c,this.result=l,this.hasListeners()&&(y(n,t).forEach(s=>{s.destroy()}),y(t,n).forEach(s=>{s.subscribe(d=>{this.onUpdate(s,d)})}),this.notify()))})}getCurrentResult(){return this.result}getQueries(){return this.observers.map(r=>r.getCurrentQuery())}getObservers(){return this.observers}getOptimisticResult(r){return this.findMatchingObservers(r).map(i=>i.observer.getOptimisticResult(i.defaultedQueryOptions))}findMatchingObservers(r){const i=this.observers,n=new Map(i.map(e=>[e.options.queryHash,e])),a=r.map(e=>this.client.defaultQueryOptions(e)),t=a.flatMap(e=>{const u=n.get(e.queryHash);return u!=null?[{defaultedQueryOptions:e,observer:u}]:[]}),c=new Set(t.map(e=>e.defaultedQueryOptions.queryHash)),l=a.filter(e=>!c.has(e.queryHash)),p=new Set(t.map(e=>e.observer)),s=i.filter(e=>!p.has(e)),d=e=>{const u=this.client.defaultQueryOptions(e),h=this.observersMap[u.queryHash];return h??new w(this.client,u)},f=l.map((e,u)=>{if(e.keepPreviousData){const h=s[u];if(h!==void 0)return{defaultedQueryOptions:e,observer:h}}return{defaultedQueryOptions:e,observer:d(e)}}),o=(e,u)=>a.indexOf(e.defaultedQueryOptions)-a.indexOf(u.defaultedQueryOptions);return t.concat(f).sort(o)}onUpdate(r,i){const n=this.observers.indexOf(r);n!==-1&&(this.result=R(this.result,n,i),this.notify())}notify(){v.batch(()=>{this.listeners.forEach(({listener:r})=>{r(this.result)})})}}function A({queries:O,context:r}){const i=E({context:r}),n=S(),a=M(),t=b.useMemo(()=>O.map(o=>{const e=i.defaultQueryOptions(o);return e._optimisticResults=n?"isRestoring":"optimistic",e}),[O,i,n]);t.forEach(o=>{C(o),q(o,a)}),H(a);const[c]=b.useState(()=>new P(i,t)),l=c.getOptimisticResult(t);x(b.useCallback(o=>n?()=>{}:c.subscribe(v.batchCalls(o)),[c,n]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),b.useEffect(()=>{c.setQueries(t,{listeners:!1})},[t,c]);const s=l.some((o,e)=>m(t[e],o,n))?l.flatMap((o,e)=>{const u=t[e],h=c.getObservers()[e];if(u&&h){if(m(u,o,n))return Q(u,h,a);B(o,n)&&Q(u,h,a)}return[]}):[];if(s.length>0)throw Promise.all(s);const d=c.getQueries(),f=l.find((o,e)=>{var u,h;return U({result:o,errorResetBoundary:a,useErrorBoundary:(u=(h=t[e])==null?void 0:h.useErrorBoundary)!=null?u:!1,query:d[e]})});if(f!=null&&f.error)throw f.error;return l}export{A as u};
