var $ = require('jquery');
var Axios = require('axios');

// TODO: Minor. Should this be part of SponsorsAPI and should that be a class?
export const DEFAULT_SPONSOR_ID = "new";

export const DEFAULT_SPONSOR = {
    id: DEFAULT_SPONSOR_ID,
    name: "Placeholder",
    link: "https://www.placeholder.co.uk/",
    image: "/sponsors/the-national-league.jpg",
    type: "Official Club Partner"
}

// Fetches all sponsors from the DB.
// Doesn't store the data within the API at all, just returns whatever we download to the caller who needs to manage the state.
export function getSponsors() {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Call our server to fetch some sponsors
            Axios.get('/api/v1/sponsors', {
                params: {}
            })
                .then(function (response) {
                    var sponsors = response.data;

                    // double check this is an array and not malicious data
                    if ($.isArray(sponsors) && sponsors.length > 0) {
                        // Cool, we got content. Resolve the promise to return the data
                        resolve(sponsors);
                    } else {
                        console.log("WARN: getSponsors() was empty");
                        resolve([]);
                    }
                })
                .catch(function (error) {
                    console.log("ERR: Problem fetching sponsors:", error);
                    reject(error);
                });
        }
    );
};

// Get the content for a sponsor which may be cached in the sponsors array.
// If the ID doesn't match one we have cached, the caller may want to fetch more data from the DB and update state.
// Returns a DEFAULT_SPONSOR if nothing is found.
export function getSponsor(id, sponsors) {
    // Look through the list of sponsors passed in, (would typically be from the state)
    if (sponsors) {
        for (var i = 0; i < sponsors.length; ++i) {
            if (id == sponsors[i].id) {
                return sponsors[i];
            }
        }
    }
    console.log("ERR: Sponsor not found:", id);
    return this.DEFAULT_SPONSOR;
};

// Creates or updates a sponsor in our DB
export function addSponsor(sponsor, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                if (sponsor.id == DEFAULT_SPONSOR_ID) {
                    // This is a POST
                    axiosInstance.post('/api/v1/sponsors', sponsor)
                        .then(function (response) {
                            console.log(response);
                            sponsor.id = response.data.id;
                            resolve(sponsor);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                } else {
                    // This is a PUT
                    axiosInstance.put(`/api/v1/sponsors/${sponsor.id}`, sponsor)
                        .then(function (response) {
                            console.log(response);
                            resolve(sponsor);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                }
            } catch (e) {
                // try failed
                console.log("ERR: addSponsor() failed:", e);
                reject(e);
            }
        }
    );
};

// Delete content from our DB with the specified ID.
// Returns the ID of the item deleted, or an error message.
export function removeSponsor(sponsorId, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.delete(`/api/v1/sponsors/${sponsorId}`)
                .then(function (response) {
                    // Object was deleted
                    console.log(response);
                    resolve(response.data.id);
                })
                .catch(function (error) {
                    // Some issue trying to delete the object
                    console.log(error.response.data);
                    reject(error.response.data);
                });

            } catch (e) {
                // try failed
                console.log("ERR: removeSponsor() failed:", e);
                reject(e);
            }
        }
    );
};
