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
    createdAt: 0
    //updatedAt: 123
    //youtube: "https://youtu.be/Y9OCIIKwI94"
};

// TODO: This is dumb and just fetches all story data we have. Page it? (Placeholders here aren't used)
// TODO: Doesn't store the data within the API at all, just returns whatever we download to the caller. Should manage state?
export function getStories(page = 0, count = 3) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/news', {
                params: {
                    page,
                    count
                }
            })
                .then(function (response) {
                    var stories = response.data;
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
                    axiosInstance.put(`/api/v1/news/${story.id}`, story)
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
