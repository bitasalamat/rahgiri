// اپ گوشی: همه‌ی فایل‌ها روی گوشی ذخیره می‌شوند تا بدون اینترنت باز شود
const CACHE="rahgiri-pwa-v15";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./fonts/Vazirmatn-Regular.ttf","./fonts/Vazirmatn-Bold.ttf"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const req=e.request,u=new URL(req.url);
  if(req.method!=="GET"||u.origin!==location.origin)return;            // ارسال به سامانه همیشه مستقیم از اینترنت
  if(req.mode==="navigate"){                                            // صفحه: اگر اینترنت بود نسخه‌ی تازه، وگرنه نسخه‌ی ذخیره‌شده
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./index.html",c));return r;}).catch(()=>caches.match("./index.html")));return;}
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req)));});
