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
    "revision": "f899c10741a2629a0747ec39dbcf1101"
  },
  {
    "url": "/android-icon-192x192.png",
    "revision": "7745a05a52b278cb68a63f2b3416d3b5"
  },
  {
    "url": "/android-icon-36x36.png",
    "revision": "f6635497c2f34964f03cdc3479cd5716"
  },
  {
    "url": "/android-icon-48x48.png",
    "revision": "83cb1c103839a080053f12c00f7ef06c"
  },
  {
    "url": "/android-icon-512x512.png",
    "revision": "fbcafa1c8fe507fef6cf5051bb8416b2"
  },
  {
    "url": "/android-icon-72x72.png",
    "revision": "ce9b7f404eef68c476d0d3137d430fc1"
  },
  {
    "url": "/android-icon-96x96.png",
    "revision": "60ced9a950e19a1bd4cb9d90dedcaef2"
  },
  {
    "url": "/apple-icon-114x114.png",
    "revision": "71f8654b89dbdfdd2440882279041371"
  },
  {
    "url": "/apple-icon-120x120.png",
    "revision": "cc2e9769dac80515398f005d0fb75d50"
  },
  {
    "url": "/apple-icon-144x144.png",
    "revision": "032c20b002abbf2c527fa196309faedf"
  },
  {
    "url": "/apple-icon-152x152.png",
    "revision": "3fe9cd116af4ffd57dc415eb389ce9fd"
  },
  {
    "url": "/apple-icon-180x180.png",
    "revision": "00fd478bcfaf72e8a08ea27476250c8c"
  },
  {
    "url": "/apple-icon-57x57.png",
    "revision": "5cc30fcb38ab217141d8f95711513c63"
  },
  {
    "url": "/apple-icon-60x60.png",
    "revision": "ac3758f6e5ef9bad791156fb4b599730"
  },
  {
    "url": "/apple-icon-72x72.png",
    "revision": "0832b37856668339e8e5c8590a0783cb"
  },
  {
    "url": "/apple-icon-76x76.png",
    "revision": "112ff4b59a3e837f26aef35369e1ddcc"
  },
  {
    "url": "/apple-icon-precomposed.png",
    "revision": "1a9a65747d2fae6bf565aff9c396dc54"
  },
  {
    "url": "/apple-icon.png",
    "revision": "48f054d0ac198859c65f10e1404b0a02"
  },
  {
    "url": "/favicon-16x16.png",
    "revision": "7f336f157c8d46e61ce9be6a358bd641"
  },
  {
    "url": "/favicon-32x32.png",
    "revision": "02b7c9ee360058ea8098bbe90bf9d578"
  },
  {
    "url": "/favicon-96x96.png",
    "revision": "fc81b23eb5f94eea3dc9e5f5b04ec6c3"
  },
  {
    "url": "/favicon.ico",
    "revision": "2da457b1f25a021a64c8a425bc919dea"
  },
  {
    "url": "/index.html",
    "revision": "4c640469c5f4015ef75b61d633480c58"
  },
  {
    "url": "/manifest.json",
    "revision": "3099449cdeecac7a7d6dad142c8e3c74"
  },
  {
    "url": "/ms-icon-144x144.png",
    "revision": "6e6785601a4cc8fc9b3fc3e109843bba"
  },
  {
    "url": "/ms-icon-150x150.png",
    "revision": "4706da189fe30ebf01ab690595e5e696"
  },
  {
    "url": "/ms-icon-310x310.png",
    "revision": "5b41239a3c9be07255b6ab8c36b8e4f0"
  },
  {
    "url": "/ms-icon-70x70.png",
    "revision": "ec026a03574dc1ea0cc6bc51ee58ecee"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
