var $ = require('jquery');
var Axios = require('axios');

// Adds an email to the newsletter subscription list
export function subscribe(email) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({});

                // This is a POST
                axiosInstance.post('/api/v1/newsletter', email)
                    .then(function (response) {
                        console.log(response);
                        subscriptionResult = response.data;
                        resolve(subscriptionResult);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log("ERR: NewsletterAPI.subscribe(): " + error.message);
                        reject(error.message);
                    });

            } catch (e) {
                // try failed
                console.log("ERR: NewsletterAPI.subscribe() failed:", e.message);
                reject(e.message);
            }
        }
    );
};
