!function(){var t,e,n,r,o,i,c,a,u,s,f={3454:function(t,e,n){"use strict";var r,o;t.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(o=n.g.process)?void 0:o.env)?n.g.process:n(7663)},2465:function(t,e,n){"use strict";n.a(t,async function(t,e){try{var r=n(6400),o=t([r]);r=(o.then?(await o)():o)[0];let i={Add:null,zkapp:null,transaction:null},c={setActiveInstanceToBerkeley:async t=>{let e=r.No.Network("https://proxy.berkeley.minaexplorer.com/graphql");console.log("Created Berkeley"),r.No.setActiveInstance(e)},loadContract:async t=>{let{Add:e}=await n.e(893).then(n.bind(n,1893));i.Add=e},compileContract:async t=>{await i.Add.compile()},fetchAccount:async t=>{let e=r.nh.fromBase58(t.publicKey58);return await (0,r.$G)({publicKey:e})},initZkappInstance:async t=>{let e=r.nh.fromBase58(t.publicKey58);i.zkapp=new i.Add(e)},createDeployContract:async t=>{let e=r.nh.fromBase58(t.feePayerAddress58),n=r._q.fromBase58(t.privateKey58);i.zkapp=new i.Add(n.toPublicKey());let o=await r.No.transaction(e,()=>{r.nx.fundNewAccount(e),i.zkapp.deploy()});o.sign([n]),i.transaction=o},getNum:async t=>{let e=await i.zkapp.num.get();return JSON.stringify(e.toJSON())},createUpdateTransaction:async t=>{let e=await r.No.transaction(()=>{i.zkapp.update()});i.transaction=e},proveUpdateTransaction:async t=>{await i.transaction.prove()},getTransactionJSON:async t=>(console.log(i.transaction.toPretty()),i.transaction.toJSON())};addEventListener("message",async t=>{let e=await c[t.data.fn](t.data.args),n={id:t.data.id,data:e};postMessage(n)}),console.log("Worker Initialized Successfully."),e()}catch(t){e(t)}})},7663:function(t){!function(){var e={229:function(t){var e,n,r,o=t.exports={};function i(){throw Error("setTimeout has not been defined")}function c(){throw Error("clearTimeout has not been defined")}function a(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{n="function"==typeof clearTimeout?clearTimeout:c}catch(t){n=c}}();var u=[],s=!1,f=-1;function l(){s&&r&&(s=!1,r.length?u=r.concat(u):f=-1,u.length&&p())}function p(){if(!s){var t=a(l);s=!0;for(var e=u.length;e;){for(r=u,u=[];++f<e;)r&&r[f].run();f=-1,e=u.length}r=null,s=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===c||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new d(t,e)),1!==u.length||s||a(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var i=n[t]={exports:{}},c=!0;try{e[t](i,i.exports,r),c=!1}finally{c&&delete n[t]}return i.exports}r.ab="//";var o=r(229);t.exports=o}()}},l={};function p(t){var e=l[t];if(void 0!==e)return e.exports;var n=l[t]={exports:{}},r=!0;try{f[t](n,n.exports,p),r=!1}finally{r&&delete l[t]}return n.exports}p.m=f,p.x=function(){var t=p.O(void 0,[829],function(){return p(2465)});return p.O(t)},t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=function(t){t&&!t.d&&(t.d=1,t.forEach(function(t){t.r--}),t.forEach(function(t){t.r--?t.r++:t()}))},p.a=function(o,i,c){c&&((a=[]).d=1);var a,u,s,f,l=new Set,p=o.exports,d=new Promise(function(t,e){f=e,s=t});d[e]=p,d[t]=function(t){a&&t(a),l.forEach(t),d.catch(function(){})},o.exports=d,i(function(o){u=o.map(function(o){if(null!==o&&"object"==typeof o){if(o[t])return o;if(o.then){var i=[];i.d=0,o.then(function(t){c[e]=t,r(i)},function(t){c[n]=t,r(i)});var c={};return c[t]=function(t){t(i)},c}}var a={};return a[t]=function(){},a[e]=o,a});var i,c=function(){return u.map(function(t){if(t[n])throw t[n];return t[e]})},s=new Promise(function(e){(i=function(){e(c)}).r=0;var n=function(t){t===a||l.has(t)||(l.add(t),t&&!t.d&&(i.r++,t.push(i)))};u.map(function(e){e[t](n)})});return i.r?s:c()},function(t){t?f(d[n]=t):s(p),r(a)}),a&&(a.d=0)},o=[],p.O=function(t,e,n,r){if(e){r=r||0;for(var i=o.length;i>0&&o[i-1][2]>r;i--)o[i]=o[i-1];o[i]=[e,n,r];return}for(var c=1/0,i=0;i<o.length;i++){for(var e=o[i][0],n=o[i][1],r=o[i][2],a=!0,u=0;u<e.length;u++)c>=r&&Object.keys(p.O).every(function(t){return p.O[t](e[u])})?e.splice(u--,1):(a=!1,r<c&&(c=r));if(a){o.splice(i--,1);var s=n();void 0!==s&&(t=s)}}return t},p.d=function(t,e){for(var n in e)p.o(e,n)&&!p.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},p.f={},p.e=function(t){return Promise.all(Object.keys(p.f).reduce(function(e,n){return p.f[n](t,e),e},[]))},p.u=function(t){return"static/chunks/"+(829===t?"cc8f0cfa":t)+"."+({829:"6f502569e63aa3ff",893:"882c13f84f03119b"})[t]+".js"},p.miniCssF=function(t){},p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),p.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},p.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},p.tt=function(){return void 0===i&&(i={createScriptURL:function(t){return t}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(i=trustedTypes.createPolicy("nextjs#bundler",i))),i},p.tu=function(t){return p.tt().createScriptURL(t)},p.p="/_next/",c={478:1},p.f.i=function(t,e){c[t]||importScripts(p.tu(p.p+p.u(t)))},u=(a=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(a),a.push=function(t){var e=t[0],n=t[1],r=t[2];for(var o in n)p.o(n,o)&&(p.m[o]=n[o]);for(r&&r(p);e.length;)c[e.pop()]=1;u(t)},s=p.x,p.x=function(){return p.e(829).then(s)},_N_E=p.x()}();