var $ = require('jquery');
var Axios = require('axios');

// TODO: Finish API operations, actually connecting to a DB.
// TODO: Add a category?
// TODO: Add ability to search?

// TODO: Minor. Should this be part of NewsAPI and should that be a class?
export const DEFAULT_STORY_ID = "new";

export const DEFAULT_STORY = {
    id: DEFAULT_STORY_ID,
    headline: "Placeholder",
    image: "/images/News-Generic2_169.jpg",
    summary: "Placeholder",
    story: "Placeholder",
    createdAt: 0 // milliseconds since epoch, (Date.now()) Calculate year and month from this for Firebase path.
    //updatedAt: 123
    //youtube: "https://youtu.be/Y9OCIIKwI94"
};

// How far back does our news go in the DB? This was the first year we have news for.
const NEWS_FIRST_YEAR = 2012;

// TODO: This is dumb and just fetches all story data we have. Page it? (Placeholders here aren't used)
// TODO: Actually, need to change all of this to involve api/v1/news/:year/:month/:id where necessary, for "paging"
//   NOTE: I have done this, but returning a flat array, with no notion of year/month preserved... can't then save a bookmark to a year/month?
// TODO: Doesn't store the data within the API at all, just returns whatever we download to the caller. Should manage state?
export function getStories(_year = null, _month = null) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            var apiPath = '/api/v1/news'; // {2017: 12: {id: story, ...}, 11: ..., 2016:...}
            if (_year) {
                if (_month)
                    apiPath = `/api/v1/news/${_year}/${_month}`; // {2017: 12: {id: story, ...}}
                else
                    apiPath = `/api/v1/news/${_year}`; // {2017: 12: {id: story, ...}, 11: ...}
            }
            // Call our server to fetch some news
            Axios.get(apiPath, {
                params: {
                    listIDs: false
                }
            })
                .then(function (response) {
                    var fullNews = response.data;
                    // If we requested a specific year, use that. Else use the current year.
                    var year = _year;
                    if (!_year) {
                        var d = new Date();
                        year = d.getFullYear();
                    }
                    // If we requested a specific month, use that. Else go through the full year.
                    var month = _month || 12;

                    // Note that stories is an array, (0-11 for months,) while yearStories is an object
                    //  but we are using dynamic property names (1-12) so it looks like array syntax.
                    var stories = [];
                    while (year >= NEWS_FIRST_YEAR) {
                        var yearStories = fullNews[year];
                        if (yearStories) {
                            while (month > 0) {
                                if (yearStories[month])
                                    stories = [...stories, ...yearStories[month]];
                                // If we requested a specific month, we can break early
                                if (_month)
                                    break;
                                --month;
                            }
                        }
                        // If we requested a specific year, we can break early
                        if (_year)
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
                    reject(e);
                });
        }
    );
};

// Get the content for a story which may be cached in the stories array.
// TODO: If the ID doesn't match one we have cached, do we try fetching from the server? Feels like that should happen on the caller's side so they can update the state.
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
                            resolve(story);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                } else {
                    // This is a PUT
                    var d = new Date(Number(story.createdAt));
                    var year = d.getFullYear();
                    var month = d.getMonth() + 1; // getMonth is 0-11, but we setup Firebase as 1-12
                    axiosInstance.put(`/api/v1/news/${year}/${month}/${story.id}`, story)
                        .then(function (response) {
                            console.log(response);
                            resolve(story);
                        })
                        .catch(function (error) {
                            // TODO: Show error message on UI
                            console.log(error.response.data);
                            reject(error.response.data);
                        });
                }
            } catch (e) {
                // try failed
                console.log("ERR: addStory() failed:", e);
                reject(e);
            }
        }
    );
};
