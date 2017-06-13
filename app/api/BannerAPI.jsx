var $ = require('jquery');
var Axios = require('axios');

// TODO: Minor. Should this be part of BannerAPI and should that be a class?
export const DEFAULT_BANNER = {
    image: '/banner/header-right.png',  // Image URL
    link: '/news',                      // URL to link to
    description: 'Big News!'            // Alt text for the image
};

// TODO: Doesn't store the data within the API at all, just returns whatever we download to the caller. Should manage state?
export function getBanner() {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/banner')
            .then(function (response) {
                var banner = response.data;

                if (banner) {
                    // Cool, we got content. Resolve the promise to return the data
                    resolve(banner);
                } else {
                    console.log("WARN: getBanner() was empty");
                    resolve(null);
                }
            })
            .catch(function (error) {
                console.log("ERR: Problem fetching banner:", error);
                reject(error);
            });
        }
    );
};

export function addBanner(banner, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.post('/api/v1/banner', banner)
                .then(function (response) {
                    console.log(response);
                    resolve(banner);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    reject(error.response.data);
                });
            } catch (e) {
                // try failed
                console.log("ERR: addBanner() failed:", e);
                reject(e);
            }
        }
    );
};

// Delete content from our DB
// Returns success message if the item deleted, or an error message.
export function removeBanner(token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.delete('/api/v1/banner')
                .then(function (response) {
                    // Object was deleted
                    console.log(response);
                    resolve(response.data);
                })
                .catch(function (error) {
                    // Some issue trying to delete the object
                    console.log(error.response.data);
                    reject(error.response.data);
                });

            } catch (e) {
                // try failed
                console.log("ERR: removeBanner() failed:", e);
                reject(e);
            }
        }
    );
};
