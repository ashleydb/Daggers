// API for getting game fixtures and results for a given season

var $ = require('jquery');
var Axios = require('axios');

export const DEFAULT_FIXTURE_ID = 0;

export const DEFAULT_FIXTURE = {
    id: DEFAULT_FIXTURE_ID,
    "date": "01-JAN-2100",
    //"logo": "badge-woking.png",
    "competition": "Vanarama National League",
    "team": ""
};

// TODO: This is dumb and just loads in all fixture data we have. Page it? (Placeholders here aren't used)
export function getFixtures(season = null) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/fixtures', {
                params: {
                    season
                }
            })
            .then(function (response) {
                var fixtures = response.data;
                // double check this is an array and not malicious data
                if ($.isArray(fixtures) && fixtures.length > 0) {
                    // Cool, we got content. Resolve the promise to return the data
                    resolve(fixtures);
                } else {
                    console.log("WARN: getFixtures() was empty");
                    resolve([]);
                }
            })
            .catch(function (error) {
                console.log("ERR: Problem fetching fixtures:", error);
                reject(e);
            });
        }
    );
};

// Get the content for a fixture which may be cached in the fixtures array.
// TODO: If the ID doesn't match one we have cached, do we try fetching from the server? Feels like that should happen on the caller's side so they can update the state.
export function getFixture(id, fixtures) {
    // Look through the list of fixtures passed in, (would typically be from the state)
    if (fixtures) {
        for (var i = 0; i < fixtures.length; ++i) {
            if (id == fixtures[i].id) {
                return fixtures[i];
            }
        }
    }
    console.log("ERR: Fixture not found:", id);
    return this.DEFAULT_FIXTURE;
};

export function addFixture(fixture) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            try {
                if (fixture.id == DEFAULT_FIXTURE_ID) {
                    // This is a POST
                    Axios.post('/api/v1/fixtures', fixture)
                    .then(function (response) {
                        console.log(response);
                        fixtures.id = response.data.id;
                        resolve(fixture);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log(error.response.data);
                        reject(error.response.data);
                    });
                } else {
                    // This is a PUT
                    Axios.put(`/api/v1/fixtures/${fixture.id}`, fixture)
                    .then(function (response) {
                        console.log(response);
                        resolve(fixture);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log(error.response.data);
                        reject(error.response.data);
                    });
                }
            } catch(e) {
                // try failed
                console.log("ERR: addFixture() failed:", e);
                reject(e);
            }
        }        
    );  
};