// اپ گوشی سامانه رهگیری — کار بدون اینترنت
// با هر نسخه‌ی جدید، این نام عوض می‌شود تا گوشی‌ها فایل تازه را بگیرند
const CACHE="rahgiri-pwa-1405-09-07-d";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","fonts/Vazirmatn-Regular.ttf","fonts/Vazirmatn-Bold.ttf"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>c.add(new Request(f,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// فقط فایل‌های خود اپ؛ درخواست‌های سامانه (script.google.com) دست‌نخورده می‌روند
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  // اول اینترنت (تا نسخه‌ی تازه فوراً برسد)، اگر نبود از حافظه‌ی گوشی
  e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))));});
