(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(2152)}])},3740:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return x}});let i=r(8754),n=r(1757),s=n._(r(7294)),o=i._(r(2636)),a=r(7757),l=r(3735),c=r(3341);r(4210);let d=i._(r(7746)),u={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function f(e){return void 0!==e.default}function h(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function p(e,t,r,i,n,s,o){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let a="decode"in e?e.decode():Promise.resolve();a.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("blur"===r&&s(!0),null==i?void 0:i.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,n=!1;i.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}})}function m(e){let[t,r]=s.version.split("."),i=parseInt(t,10),n=parseInt(r,10);return i>18||18===i&&n>=3?{fetchPriority:e}:{fetchpriority:e}}let g=(0,s.forwardRef)((e,t)=>{let{imgAttributes:r,heightInt:i,widthInt:n,qualityInt:o,className:a,imgStyle:l,blurStyle:c,isLazy:d,fetchPriority:u,fill:f,placeholder:h,loading:g,srcString:_,config:x,unoptimized:v,loader:b,onLoadRef:j,onLoadingCompleteRef:w,setBlurComplete:y,setShowAltText:E,onLoad:N,onError:C,...S}=e;return g=d?"lazy":g,s.default.createElement("img",{...S,...m(u),loading:g,width:n,height:i,decoding:"async","data-nimg":f?"fill":"1",className:a,style:{...l,...c},...r,ref:(0,s.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(C&&(e.src=e.src),e.complete&&p(e,_,h,j,w,y,v))},[_,h,j,w,y,C,v,t]),onLoad:e=>{let t=e.currentTarget;p(t,_,h,j,w,y,v)},onError:e=>{E(!0),"blur"===h&&y(!0),C&&C(e)}})}),_=(0,s.forwardRef)((e,t)=>{var r;let i,n,{src:p,sizes:_,unoptimized:x=!1,priority:v=!1,loading:b,className:j,quality:w,width:y,height:E,fill:N,style:C,onLoad:S,onLoadingComplete:P,placeholder:k="empty",blurDataURL:O,fetchPriority:z,layout:R,objectFit:I,objectPosition:M,lazyBoundary:A,lazyRoot:D,...H}=e,L=(0,s.useContext)(c.ImageConfigContext),T=(0,s.useMemo)(()=>{let e=u||L||l.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[L]),F=H.loader||d.default;delete H.loader;let G="__next_img_default"in F;if(G){if("custom"===T.loader)throw Error('Image with src "'+p+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=F;F=t=>{let{config:r,...i}=t;return e(i)}}if(R){"fill"===R&&(N=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[R];e&&(C={...C,...e});let t={responsive:"100vw",fill:"100vw"}[R];t&&!_&&(_=t)}let W="",B=h(y),V=h(E);if("object"==typeof(r=p)&&(f(r)||void 0!==r.src)){let e=f(p)?p.default:p;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(i=e.blurWidth,n=e.blurHeight,O=O||e.blurDataURL,W=e.src,!N){if(B||V){if(B&&!V){let t=B/e.width;V=Math.round(e.height*t)}else if(!B&&V){let t=V/e.height;B=Math.round(e.width*t)}}else B=e.width,V=e.height}}let q=!v&&("lazy"===b||void 0===b);(!(p="string"==typeof p?p:W)||p.startsWith("data:")||p.startsWith("blob:"))&&(x=!0,q=!1),T.unoptimized&&(x=!0),G&&p.endsWith(".svg")&&!T.dangerouslyAllowSVG&&(x=!0),v&&(z="high");let[U,Y]=(0,s.useState)(!1),[J,Q]=(0,s.useState)(!1),X=h(w),K=Object.assign(N?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:I,objectPosition:M}:{},J?{}:{color:"transparent"},C),$="blur"===k&&O&&!U?{backgroundSize:K.objectFit||"cover",backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'+(0,a.getImageBlurSvg)({widthInt:B,heightInt:V,blurWidth:i,blurHeight:n,blurDataURL:O,objectFit:K.objectFit})+'")'}:{},Z=function(e){let{config:t,src:r,unoptimized:i,width:n,quality:s,sizes:o,loader:a}=e;if(i)return{src:r,srcSet:void 0,sizes:void 0};let{widths:l,kind:c}=function(e,t,r){let{deviceSizes:i,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(r);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:n,kind:"w"}}if("number"!=typeof t)return{widths:i,kind:"w"};let s=[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))];return{widths:s,kind:"x"}}(t,n,o),d=l.length-1;return{sizes:o||"w"!==c?o:"100vw",srcSet:l.map((e,i)=>a({config:t,src:r,quality:s,width:e})+" "+("w"===c?e:i+1)+c).join(", "),src:a({config:t,src:r,quality:s,width:l[d]})}}({config:T,src:p,unoptimized:x,width:B,quality:X,sizes:_,loader:F}),ee=p,et=(0,s.useRef)(S);(0,s.useEffect)(()=>{et.current=S},[S]);let er=(0,s.useRef)(P);(0,s.useEffect)(()=>{er.current=P},[P]);let ei={isLazy:q,imgAttributes:Z,heightInt:V,widthInt:B,qualityInt:X,className:j,imgStyle:K,blurStyle:$,loading:b,config:T,fetchPriority:z,fill:N,unoptimized:x,placeholder:k,loader:F,srcString:ee,onLoadRef:et,onLoadingCompleteRef:er,setBlurComplete:Y,setShowAltText:Q,...H};return s.default.createElement(s.default.Fragment,null,s.default.createElement(g,{...ei,ref:t}),v?s.default.createElement(o.default,null,s.default.createElement("link",{key:"__nimg-"+Z.src+Z.srcSet+Z.sizes,rel:"preload",as:"image",href:Z.srcSet?void 0:Z.src,imageSrcSet:Z.srcSet,imageSizes:Z.sizes,crossOrigin:H.crossOrigin,...m(z)})):null)}),x=_;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7757:function(e,t){"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:i,blurHeight:n,blurDataURL:s,objectFit:o}=e,a=i||t,l=n||r,c=s.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return a&&l?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 "+a+" "+l+"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='"+(i&&n?"1":"20")+"'/%3E"+c+"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='"+s+"'/%3E%3C/svg%3E":"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='"+("contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none")+"' x='0' y='0' height='100%25' width='100%25' href='"+s+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},7746:function(e,t){"use strict";function r(e){let{config:t,src:r,width:i,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+i+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}}),r.__next_img_default=!0;let i=r},2152:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var i=r(5893),n=r(9008),s=r.n(n),o=r(5675),a=r.n(o),l=r(9034),c=r.n(l);function d(){return(0,i.jsxs)("div",{className:c().container,children:[(0,i.jsxs)(s(),{children:[(0,i.jsx)("title",{children:"Create Next App"}),(0,i.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsxs)("main",{className:c().main,children:[(0,i.jsxs)("h1",{className:c().title,children:["Welcome to ",(0,i.jsx)("a",{href:"https://nextjs.org",children:"Next.js!"})]}),(0,i.jsxs)("p",{className:c().description,children:["Get started by editing"," ",(0,i.jsx)("code",{className:c().code,children:"pages/index.tsx"})]}),(0,i.jsxs)("div",{className:c().grid,children:[(0,i.jsxs)("a",{href:"https://nextjs.org/docs",className:c().card,children:[(0,i.jsx)("h2",{children:"Documentation →"}),(0,i.jsx)("p",{children:"Find in-depth information about Next.js features and API."})]}),(0,i.jsxs)("a",{href:"https://nextjs.org/learn",className:c().card,children:[(0,i.jsx)("h2",{children:"Learn →"}),(0,i.jsx)("p",{children:"Learn about Next.js in an interactive course with quizzes!"})]}),(0,i.jsxs)("a",{href:"https://github.com/vercel/next.js/tree/canary/examples",className:c().card,children:[(0,i.jsx)("h2",{children:"Examples →"}),(0,i.jsx)("p",{children:"Discover and deploy boilerplate example Next.js projects."})]}),(0,i.jsxs)("a",{href:"https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",className:c().card,children:[(0,i.jsx)("h2",{children:"Deploy →"}),(0,i.jsx)("p",{children:"Instantly deploy your Next.js site to a public URL with Vercel."})]})]})]}),(0,i.jsx)("footer",{className:c().footer,children:(0,i.jsxs)("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",children:["Powered by"," ",(0,i.jsx)("span",{className:c().logo,children:(0,i.jsx)(a(),{src:"/vercel.svg",alt:"Vercel Logo",width:72,height:16})})]})})]})}},9034:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}},9008:function(e,t,r){e.exports=r(2636)},5675:function(e,t,r){e.exports=r(3740)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);