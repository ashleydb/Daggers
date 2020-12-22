var $ = require('jquery');
var Axios = require('axios');

// TODO: Add a category? e.g. Match Report, Club News, Player News
// TODO: Add ability to search?

// TODO: Minor. Should this be part of NewsAPI and should that be a class?
export const DEFAULT_STORY_ID = "new";

export const DEFAULT_STORY = {
    id: DEFAULT_STORY_ID,
    headline: "Placeholder",
    image: "/basics/News-Generic2_169.jpg",
    summary: "Placeholder",
    story: "Placeholder",
    createdAt: 0 // milliseconds since epoch, (Date.now()) Calculate year and month from this for Firebase path.
    //updatedAt: 123
    //youtube: "https://youtu.be/Y9OCIIKwI94"
};

// For specifying which news stories to download, if not a specific year or year/month
export const FETCH_LATEST = 'latest';
export const FETCH_RECENT = 'recent';
export const FETCH_ALL = null;

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

// How many stories to fetch from the server when getting Recent stories for the homepage
const NEWS_RECENT_STORY_COUNT = 5;

// TODO: This assumes we have data for all of these years. Doesn't check with our DB even once.
export function getYearList(includeNextYear = false) {
    var years = [];
    var d = new Date();
    var year = d.getFullYear();
    if (includeNextYear) {
        ++year;
    }
    while (year >= NEWS_FIRST_YEAR) {
        years.push(year);
        --year;
    }
    return years;
}
// TODO: This assumes we have data for all of these months. Doesn't check with our DB even once for a given year.
export function getMonthList() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months;
}

// Fetches all news stories from the DB. Optionally set a year or year and month to limit the results returned.
// Doesn't store the data within the API at all, just returns whatever we download to the caller who needs to manage the state.
//   NOTE: Returns a flat array, with no notion of year/month preserved...
// TODO: Should the caller store as a 2d array? Should they sort the array as new results come in?
export function getStories(_year = FETCH_ALL, _month = FETCH_ALL, token = null) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {

            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                var apiPath = '/api/v1/news'; // {2017: 12: {id: story, ...}, 11: ..., 2016:...}
                if (_year) {
                    if (_month)
                        apiPath = `/api/v1/news/${_year}/${_month}`; // {2017: 12: {id: story, ...}}
                    else
                        apiPath = `/api/v1/news/${_year}`; // {2017: 12: {id: story, ...}, 11: ...}
                }

                axiosInstance.get(apiPath, {
                    params: {
                        listIDs: false
                    }
                }).then(function (response) {
                    var fullNews = response.data;
                    // If we requested a specific year, use that. Else use the current year.
                    var year = _year;
                    if (!_year || _year == FETCH_LATEST || _year == FETCH_RECENT) {
                        var d = new Date();
                        year = d.getFullYear();
                    }
                    // If we requested a specific month, use that. Else go through the full year.
                    var month = _month;
                    if (!_month || _month == FETCH_LATEST) {
                        month = 12;
                    }

                    // Note that stories is an array, (0-11 for months,) while yearStories is an object
                    //  but we are using dynamic property names (1-12) so it looks like array syntax.
                    var stories = [];
                    while (year >= NEWS_FIRST_YEAR) {
                        var yearStories = fullNews[year];
                        if (yearStories) {
                            while (month > 0) {
                                if (yearStories[month])
                                    stories = [...stories, ...yearStories[month]];
                                // If we requested a specific month, we can break early.
                                if ((_month && _month != FETCH_LATEST) || (_month == FETCH_LATEST && stories.length))
                                    break;
                                --month;
                            }
                        }
                        // If we requested a specific year, we can break early
                        if ((_year && _year != FETCH_LATEST && _year != FETCH_RECENT) || (_year == FETCH_LATEST && stories.length) || (_year == FETCH_RECENT && stories.length >= NEWS_RECENT_STORY_COUNT))
                            break;
                        month = 12;
                        --year;
                    }
                    // double check this is an array and not malicious data
                    if ($.isArray(stories) && stories.length > 0) {
                        // Cool, we got content. Resolve the promise to return the data
                        resolve(stories);
                    } else {
                        console.log("WARN: getStories() was empty");
                        resolve([]);
                    }
                })
                .catch(function (error) {
                    console.log("ERR: Problem fetching news:", error);
                    reject(error);
                });
                
            } catch (e) {
                // try failed
                console.log("ERR: getStories() failed:", e.message);
                reject(e.message);
            }
        }
    );
};

// Get the content for a story which may be cached in the stories array.
// If the ID doesn't match one we have cached, the caller may want to fetch more data from the DB and update state.
// Returns a DEFAULT_STORY if nothing is found.
export function getStory(id, stories) {
    // Look through the list of stories passed in, (would typically be from the state)
    if (stories) {
        for (var i = 0; i < stories.length; ++i) {
            if (id == stories[i].id) {
                return stories[i];
            }
        }
    }
    console.log("ERR: Story not found:", id);
    return this.DEFAULT_STORY;
};


// Get the content for a story which may be cached in the stories array.
// If the ID doesn't match one we have cached, we will check the server.
// Returns a Promise. Eventual response is the story or DEFAULT_STORY if nothing is found.
export function getStoryRemote(_id, _stories) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {

            // Look through the list of stories passed in, (would typically be from the state)
            if (_stories) {
                for (var i = 0; i < _stories.length; ++i) {
                    if (_id == _stories[i].id) {
                        // Cool, we got content. Resolve the promise to return the data
                        resolve(_stories[i]);
                        return;
                    }
                }
            }
            
            // Story not found in the local news, so check the server
            try {
                const axiosInstance = Axios.create({
                    //headers: { 'x-access-token': token }
                });

                var apiPath = `/api/v1/news/id/${_id}`;

                axiosInstance.get(apiPath, {
                    params: {
                        listIDs: false
                    }
                }).then(function (response) {
                    var story = response.data;
                    if (story) {
                        // Cool, we got content. Resolve the promise to return the data
                        resolve(story);
                    } else {
                        // Still nothing found. Just return a default story
                        console.log("WARN: getStoryRemote() - Story not found:", id);
                        resolve(this.DEFAULT_STORY);
                    }
                })
                .catch(function (error) {
                    console.log("ERR: getStoryRemote() - Problem fetching story:", error);
                    reject(error);
                });
                
            } catch (e) {
                // try failed
                console.log("ERR: getStoryRemote() failed:", e.message);
                reject(e.message);
            }
        }
    );
};


// Creates or updates a story in our DB
export function addStory(story, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                if (story.id == DEFAULT_STORY_ID) {
                    // This is a POST
                    axiosInstance.post('/api/v1/news', story)
                        .then(function (response) {
                            console.log(response);
                            story.id = response.data.id;
                            story.createdAt = response.data.createdAt;
                            resolve(story);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log("ERR: addStory(): " + error.message);
                            reject(error.message);
                        });
                } else {
                    // This is a PUT
                    var d = new Date(Number(story.oldCreatedAt));
                    var year = d.getFullYear();
                    var month = d.getMonth() + 1; // getMonth is 0-11, but we setup Firebase as 1-12
                    axiosInstance.put(`/api/v1/news/${year}/${month}/${story.id}`, story)
                        .then(function (response) {
                            console.log(response);
                            story.updatedAt = Date.now(); // year and month returned in response, but just do this
                            resolve(story);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log("ERR: addStory(): " + error.message);
                            reject(error.message);
                        });
                }
            } catch (e) {
                // try failed
                console.log("ERR: addStory() failed:", e.message);
                reject(e.message);
            }
        }
    );
};

// Delete content from our DB with the specified ID.
// Returns the ID of the item deleted, or an error message.
export function removeStory(story, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });
                
                var d = new Date(Number(story.createdAt));
                var year = d.getFullYear();
                var month = d.getMonth() + 1; // getMonth is 0-11, but we setup Firebase as 1-12

                axiosInstance.delete(`/api/v1/news/${year}/${month}/${story.id}`)
                .then(function (response) {
                    // Object was deleted
                    console.log(response);
                    resolve(response.data.id);
                })
                .catch(function (error) {
                    // Some issue trying to delete the object
                    console.log("ERR: removeStory(): " + error.message);
                    reject(error.message);
                });

            } catch (e) {
                // try failed
                console.log("ERR: removeStory() failed:", e.message);
                reject(e.message);
            }
        }
    );
};
