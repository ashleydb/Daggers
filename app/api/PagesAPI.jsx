var $ = require('jquery');
var Axios = require('axios');

// TODO: Minor. Should this be part of PagesAPI and should that be a class?
export const DEFAULT_PAGE_ID = "new";

export const DEFAULT_PAGE = {
    id: DEFAULT_PAGE_ID,    // ID value from Firebase
    name: 'Placeholder',    // This will be the name of the page, e.g. 'tickets'
    content: 'Placeholder', // This will be HTML for the page
    createdAt: 0            // This will be milliseconds since epoch
    //updatedAt: 123        // This will be milliseconds since epoch
};

// TODO: Doesn't store the data within the API at all, just returns whatever we download to the caller. Should manage state?
export function getPages() {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/pages', {
            })
                .then(function (response) {
                    var pages = response.data;
                    // double check this is an array and not malicious data
                    if ($.isArray(pages) && pages.length > 0) {
                        // Cool, we got content. Resolve the promise to return the data
                        resolve(pages);
                    } else {
                        console.log("WARN: getPages() was empty");
                        resolve([]);
                    }
                })
                .catch(function (error) {
                    console.log("ERR: Problem fetching pages:", error);
                    reject(e);
                });
        }
    );
};

// Get the content for a page which may be cached in the pages array.
// TODO: If the ID doesn't match one we have cached, do we try fetching from the server? Feels like that should happen on the caller's side so they can update the state.
export function getPage(id, pages) {
    // Look through the list of pages passed in, (would typically be from the state)
    if (pages) {
        for (var i = 0; i < pages.length; ++i) {
            if (id == pages[i].id) {
                return pages[i];
            }
        }
    }
    console.log("ERR: Page not found:", id);
    //return this.DEFAULT_PAGE;
    return null;
};

export function addPage(page, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                if (page.id == DEFAULT_PAGE_ID) {
                    // This is a POST
                    axiosInstance.post('/api/v1/pages', page)
                        .then(function (response) {
                            console.log(response);
                            // TODO: Not really necessary since we're just using the name
                            page.id = response.data.id;
                            resolve(page);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                } else {
                    // This is a PUT
                    axiosInstance.put(`/api/v1/pages/${page.id}`, page)
                        .then(function (response) {
                            console.log(response);
                            resolve(page);
                        })
                        .catch(function (error) {
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                }
            } catch (e) {
                // try failed
                console.log("ERR: addPage() failed:", e);
                reject(e);
            }
        }
    );
};

// Delete content from our DB with the specified ID.
// Returns the ID of the item deleted, or an error message.
export function removePage(pageId, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.delete(`/api/v1/pages/${pageId}`)
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
                console.log("ERR: removePage() failed:", e);
                reject(e);
            }
        }
    );
};
