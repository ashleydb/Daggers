importScripts('workbox-sw.prod.v1.0.1.js');

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
    "url": "/ad-medianet-332x280.html",
    "revision": "4bdeb17fb9775489c6a55b49fc4f8e40"
  },
  {
    "url": "/android-icon-144x144.png",
    "revision": "bb51c8451a69590d3670f4029377402c"
  },
  {
    "url": "/android-icon-192x192.png",
    "revision": "91632e6d1f61f1474e304083b38aae96"
  },
  {
    "url": "/android-icon-36x36.png",
    "revision": "5c750c7156413ae664544e6d8559ef72"
  },
  {
    "url": "/android-icon-48x48.png",
    "revision": "b14d2ce59ffe15ef684f31939e2468f2"
  },
  {
    "url": "/android-icon-72x72.png",
    "revision": "e3922231238408b5e46d30490dd18279"
  },
  {
    "url": "/android-icon-96x96.png",
    "revision": "b487bd9bee330f4617b9b33c3d456be8"
  },
  {
    "url": "/apple-icon-114x114.png",
    "revision": "56a53d1a4234f9ca76729ac111c13e29"
  },
  {
    "url": "/apple-icon-120x120.png",
    "revision": "e6c679d4b94038a3e6485a34e21514be"
  },
  {
    "url": "/apple-icon-144x144.png",
    "revision": "bb51c8451a69590d3670f4029377402c"
  },
  {
    "url": "/apple-icon-152x152.png",
    "revision": "862fe7a45937637feae57651d091b676"
  },
  {
    "url": "/apple-icon-180x180.png",
    "revision": "52eed402e80a0614b239c9822f48c8de"
  },
  {
    "url": "/apple-icon-57x57.png",
    "revision": "80b4772c3804ebb0f1b71ba5a924809a"
  },
  {
    "url": "/apple-icon-60x60.png",
    "revision": "13639429bd04732041bda3f084bed6cc"
  },
  {
    "url": "/apple-icon-72x72.png",
    "revision": "e3922231238408b5e46d30490dd18279"
  },
  {
    "url": "/apple-icon-76x76.png",
    "revision": "60d4c199e5ae1bd298f95bae8e83d38d"
  },
  {
    "url": "/apple-icon-precomposed.png",
    "revision": "611578a9235027ec721c607fd8795966"
  },
  {
    "url": "/apple-icon.png",
    "revision": "611578a9235027ec721c607fd8795966"
  },
  {
    "url": "/favicon-16x16.png",
    "revision": "8b02f9d6bc9f4626a0a569ada8712485"
  },
  {
    "url": "/favicon-32x32.png",
    "revision": "b3ffb5220bcc399215366d165892aba7"
  },
  {
    "url": "/favicon-96x96.png",
    "revision": "b487bd9bee330f4617b9b33c3d456be8"
  },
  {
    "url": "/favicon.ico",
    "revision": "2da457b1f25a021a64c8a425bc919dea"
  },
  {
    "url": "/index.html",
    "revision": "bf0781bce1955ed3c5b34e77d9944f8b"
  },
  {
    "url": "/manifest.json",
    "revision": "63d5840e45874f6eca00ca2293cf3552"
  },
  {
    "url": "/ms-icon-144x144.png",
    "revision": "bb51c8451a69590d3670f4029377402c"
  },
  {
    "url": "/ms-icon-150x150.png",
    "revision": "52bea3be08eb32038b66d88222033084"
  },
  {
    "url": "/ms-icon-310x310.png",
    "revision": "cb944f9e34b32797e351b32650e13a30"
  },
  {
    "url": "/ms-icon-70x70.png",
    "revision": "b293031138020ef52a64544261526a36"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
