// A basic data caching helper class.

const DEFAULT_CACHE_EXPIRES = 30; // Minutes

// Elsewhere in your code you make web/db requests, then store the values for some time in a Cache variable.
// When requesting again, this will return the cached results, or if the timeout has expired then you can fetch again.
class Cache {
    // this.data = the data being cached
    // this.timeoutMS = milliseconds duration to cache data for
    // this.nextUpdate = milliseconds timestamp of when the cache expires

    constructor(value = null, timeoutMinutes = DEFAULT_CACHE_EXPIRES) {
        this.setTimeout(timeoutMinutes);
        this.setData(value);
    }

    // Get the value back if still valid, otherwise return null
    getDataIfValid() {
        // Check if our cache has expired
        var now = new Date().getTime();
        if (now > this.nextUpdate) {
            return null;
        } else {
            return this.data;
        }
    }

    // Set the value
    setData(value) {
        this.data = value;

        var now = new Date().getTime();
        this.nextUpdate = now + this.timeoutMS;
    }

    // Set how long the cache should be valid after setting data, (extends current value if there is one)
    setTimeout(timeoutMinutes = DEFAULT_CACHE_EXPIRES) {
        this.timeoutMS = (timeoutMinutes * 1000 * 60);
        if (this.data) {
            var now = new Date().getTime();
            this.nextUpdate = now + (timeoutMinutes * 1000 * 60);
        }
    }

    // Set the cache as invalid so it will be refetched at next check
    invalidate() {
        this.data = null;
        this.nextUpdate = 0;
    }
}

module.exports = Cache;
