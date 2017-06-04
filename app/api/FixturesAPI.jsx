// API for getting game fixtures and results for a given season

var $ = require('jquery');
var Axios = require('axios');

// For sorting arrays efficiently
var Sorter = require('app/Sorter');

export const DEFAULT_FIXTURE_ID = 0;

export const DEFAULT_FIXTURE = {
    id: DEFAULT_FIXTURE_ID,
    date: '01-JAN-2100',
    // logo: 'badge-woking.png', // Defaults to Daggers logo
    competition: 'Vanarama National League', // Or FA Cup, etc.
    team: '', // Name of the opposition club
    // home_away: 'H', // H or A
    // w_l_d: '', // W, L or D for Win, Lose or Draw, X or '' for not yet played
    // attendance: '1,000', // A Number of spectators
    // report: '#', // URL of a match report, (if there is a w_l_d value,) or to a match preview. Otherwise a ticket sales link is shown, if blank.
    // result: '', // Score, e.g. '3 - 2'
    // season: '2017-18', // Years of this season
    squad: 'First' // Or U16, etc.
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
                    // Cool, we got content.
                    
                    // Sort by date, (note we included Sorter above.)
                    fixtures.sortBy(function(o){ return new Date( o.date ) });
                    
                    // Resolve the promise to return the data
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

export function addFixture(fixture, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: {'x-access-token': token}
                });
                
                if (fixture.id == DEFAULT_FIXTURE_ID) {
                    // This is a POST
                    axiosInstance.post('/api/v1/fixtures', fixture)
                    .then(function (response) {
                        console.log(response);
                        fixture.id = response.data.id;
                        resolve(fixture);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log(error.response.data);
                        reject(error.response.data);
                    });
                } else {
                    // This is a PUT
                    axiosInstance.put(`/api/v1/fixtures/${fixture.id}`, fixture)
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

// Delete content from our DB with the specified ID.
// Returns the ID of the item deleted, or an error message.
export function removeFixture(fixtureId, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.delete(`/api/v1/fixtures/${fixtureId}`)
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
                console.log("ERR: removeFixture() failed:", e);
                reject(e);
            }
        }
    );
};
