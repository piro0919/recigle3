if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,r)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const i={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return i;default:return e(s)}}))).then((e=>{const s=r(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/G6CCRKsmOMmRPe6YJ9oJp/_buildManifest.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/G6CCRKsmOMmRPe6YJ9oJp/_ssgManifest.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/252f366e-d2745f107efbc8801d66.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/936.2ddc9a6e11883bde4915.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/982-610d79fcb8a3f40bf708.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/ae51ba48-d0c8d238ac4f17bd7f14.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/main-1b0f1fd287f08bad6012.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/pages/_app-8be513ea2c4ae9d1e311.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/pages/_error-80402f6d6dae03a985bc.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/pages/index-fc8a2652bc11e966fd20.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/chunks/webpack-43874d1a4bba990d7329.js",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/css/451e5d4c37dc2456cbf2.css",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/css/c3448e7c0facf4f89548.css",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/media/NP_Shimizu.257559ae995ad62f037f33807265126d.woff",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/media/NP_Shimizu.4f33ad1262449e5912610dd8960307b2.woff2",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/_next/static/media/NP_Shimizu.89008866f149c2f1f4f112958a00b1e7.ttf",revision:"G6CCRKsmOMmRPe6YJ9oJp"},{url:"/favicon.ico",revision:"b57f1802578e543eb527466da659c9b9"},{url:"/logo192.png",revision:"1d1e5ed818fcdbcd03846ebe848b037c"},{url:"/logo512.png",revision:"532db8a9528906e5baff8fafdef27653"},{url:"/manifest.json",revision:"0bb21b51753c045c3d61300747286ddf"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
