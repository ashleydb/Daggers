importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "android-chrome-192x192.png",
    "revision": "cfda5fa55496290ea2f962c7ba1b744a"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "c9b43fbe5560322c1fc725a5ed37ec42"
  },
  {
    "url": "apple-touch-icon-114x114-precomposed.png",
    "revision": "9ea4e31cb1d1cf2aecd21fa843613368"
  },
  {
    "url": "apple-touch-icon-114x114.png",
    "revision": "eb5f38a521a3687b352e01402bf99371"
  },
  {
    "url": "apple-touch-icon-120x120-precomposed.png",
    "revision": "3e730dbd68eafefe304b3fd088c44f68"
  },
  {
    "url": "apple-touch-icon-120x120.png",
    "revision": "0682054480ff4b9cfc58c616a2ef8d51"
  },
  {
    "url": "apple-touch-icon-144x144-precomposed.png",
    "revision": "cd179d4665fa54e54cdebf683f7ec582"
  },
  {
    "url": "apple-touch-icon-144x144.png",
    "revision": "2fbd43a4117a41ca8141ac3870c9213b"
  },
  {
    "url": "apple-touch-icon-152x152-precomposed.png",
    "revision": "26c39f469ed3899f2d91a98d0d0bbc73"
  },
  {
    "url": "apple-touch-icon-152x152.png",
    "revision": "f01c6f1347d35f807a1236a72e0f0a5c"
  },
  {
    "url": "apple-touch-icon-180x180-precomposed.png",
    "revision": "5887a6e879eda0e5c8dadd185f94f992"
  },
  {
    "url": "apple-touch-icon-180x180.png",
    "revision": "859627dcd458c4d95b03e0b1f0b666e7"
  },
  {
    "url": "apple-touch-icon-57x57-precomposed.png",
    "revision": "e51f5fc6438f256c09a01b51ead15799"
  },
  {
    "url": "apple-touch-icon-57x57.png",
    "revision": "7993a1bf071ec74ada975ac1202f5508"
  },
  {
    "url": "apple-touch-icon-60x60-precomposed.png",
    "revision": "68f1f95c273f03ed3407b664f73de44b"
  },
  {
    "url": "apple-touch-icon-60x60.png",
    "revision": "b0c82929007aac49525ed40ca9611be4"
  },
  {
    "url": "apple-touch-icon-72x72-precomposed.png",
    "revision": "971aa7ad40cf4550f9581935c710bdc1"
  },
  {
    "url": "apple-touch-icon-72x72.png",
    "revision": "538cabc9b200a22d09a53d37f2bc31fa"
  },
  {
    "url": "apple-touch-icon-76x76-precomposed.png",
    "revision": "79d7f82ae276198319891ad959788c43"
  },
  {
    "url": "apple-touch-icon-76x76.png",
    "revision": "60dcb07dda33c46830ff364969411e1f"
  },
  {
    "url": "apple-touch-icon-precomposed.png",
    "revision": "5887a6e879eda0e5c8dadd185f94f992"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "859627dcd458c4d95b03e0b1f0b666e7"
  },
  {
    "url": "bundle.js",
    "revision": "078c31be7d71877f67930398baee9cee"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "fc5131b143e88430ac11adb6e5a182fb"
  },
  {
    "url": "favicon-194x194.png",
    "revision": "3f9a9e6af129af628627a529b4428af8"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "b66a1a19645b2b444bce27592dbb4a67"
  },
  {
    "url": "favicon.ico",
    "revision": "c10c515b347c170754cdcb09bb80d438"
  },
  {
    "url": "index.html",
    "revision": "23284694d382dd2ef17238265e253a0f"
  },
  {
    "url": "manifest.json",
    "revision": "10b7acf2c0531ffc46ce082bb8554854"
  },
  {
    "url": "mstile-144x144.png",
    "revision": "10130cd14fd4a187acfbe838c6aeb972"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "75ecf75bc74b76802d84a0fa5e703c28"
  },
  {
    "url": "workbox-sw.prod.v1.0.1.js",
    "revision": "3fbc93cd82283d7c3a2cb4dcaf36be91"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
