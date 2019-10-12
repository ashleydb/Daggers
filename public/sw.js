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
    "url": "android-icon-144x144.png",
    "revision": "9b68c6555fd5562dd5d1992653746300"
  },
  {
    "url": "android-icon-192x192.png",
    "revision": "b6f3e35d470f3014e92193061be120eb"
  },
  {
    "url": "android-icon-36x36.png",
    "revision": "b4321dd80475279000763fe5f7c279fe"
  },
  {
    "url": "android-icon-48x48.png",
    "revision": "d3ce4ff2ad8657092e0878ca9e4e2328"
  },
  {
    "url": "android-icon-72x72.png",
    "revision": "8bc2c514734ab5ecf373fa90a2550498"
  },
  {
    "url": "android-icon-96x96.png",
    "revision": "cab659311e9441817dd1d3d1b4498c4f"
  },
  {
    "url": "apple-icon-114x114.png",
    "revision": "7549210e4354ac33e74ee606585611b7"
  },
  {
    "url": "apple-icon-120x120.png",
    "revision": "d1124fd9cc22a9052cc31370853ad126"
  },
  {
    "url": "apple-icon-144x144.png",
    "revision": "9b68c6555fd5562dd5d1992653746300"
  },
  {
    "url": "apple-icon-152x152.png",
    "revision": "75dacb87eef3faaf02ff115618d64762"
  },
  {
    "url": "apple-icon-180x180.png",
    "revision": "f40d8f2713e11475aed6e6ff65ae0115"
  },
  {
    "url": "apple-icon-57x57.png",
    "revision": "a67395dfa3cd338a0ca0ee49952ca195"
  },
  {
    "url": "apple-icon-60x60.png",
    "revision": "d70250f2bb2e1d793fa98fa49e6aaad3"
  },
  {
    "url": "apple-icon-72x72.png",
    "revision": "8bc2c514734ab5ecf373fa90a2550498"
  },
  {
    "url": "apple-icon-76x76.png",
    "revision": "ffb4ab354432067581c4b4f2bcb7af17"
  },
  {
    "url": "apple-icon-precomposed.png",
    "revision": "374166bd0402846edfd72b7f00993cba"
  },
  {
    "url": "apple-icon.png",
    "revision": "374166bd0402846edfd72b7f00993cba"
  },
  {
    "url": "bundle.js",
    "revision": "637d102b2a62d77b533f156cad8bfe3e"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "21b36ebb61c9dbc63125393c6bb05210"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "a386ced2cfb455f04062ff04a7f799d8"
  },
  {
    "url": "favicon-96x96.png",
    "revision": "cab659311e9441817dd1d3d1b4498c4f"
  },
  {
    "url": "favicon.ico",
    "revision": "a32b5fad301841238856e1c2a179eba7"
  },
  {
    "url": "index.html",
    "revision": "991f0c1d364a9e65fdc02b86bf6aa0d4"
  },
  {
    "url": "manifest.json",
    "revision": "8a6baeb59bd189a9fbde08d3d488a807"
  },
  {
    "url": "ms-icon-144x144.png",
    "revision": "9b68c6555fd5562dd5d1992653746300"
  },
  {
    "url": "ms-icon-150x150.png",
    "revision": "a5233dfacb18f5a3ef3d2e706aacd0ec"
  },
  {
    "url": "ms-icon-310x310.png",
    "revision": "f4d534347ed4af91b050ba4a370c0b1c"
  },
  {
    "url": "ms-icon-70x70.png",
    "revision": "8e366a99b3f904a41d7346aaebf2c0f2"
  },
  {
    "url": "workbox-sw.prod.v1.0.1.js",
    "revision": "3fbc93cd82283d7c3a2cb4dcaf36be91"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
