// API for getting player profiles

var $ = require('jquery');
var Axios = require('axios');

// For sorting arrays efficiently
var Sorter = require('app/Sorter');

export const DEFAULT_PLAYER_ID = 0;

export const DEFAULT_PLAYER = {
    id: DEFAULT_PLAYER_ID,
    first_name: '', //Scott
    last_name: '', //Doe
    date_of_birth: 0, // 846835200000 = 1-NOV-1996
    image: '/player/bg_player_231by264.png',
    shirt_number: 99, //4 [ignored for management]
    position: 'Defender', //Freeform to make it possible to add management roles too
    short_description: '', //Kit sponsored by Haines Watts
    biography: '', //Some HTML for things like experience, mangement qualifications, etc.
    height: '0 Metres', //1.85 Metres [ignored for management]
    weight: '0 Kilograms', //77 Kilograms [ignored for management]
    nationality: 'English',
    onloan_status: 'No', // [ignored for management]
    status: 'Active',
    team: 'First', // First team, Academy, Management, etc.
    date_joined: 0 // 846835200000 = 1-NOV-1996
};

// This is dumb and just loads in all player data we have for all squads. Page it by team?
export function getPlayers() {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/players')
            .then(function (response) {
                var players = response.data;
                // double check this is an array and not malicious data
                if ($.isArray(players) && players.length > 0) {
                    // Cool, we got content.
                    
                    // Sort by team and position, (note we included Sorter above.)
                    players.sortBy(function(o){ return [o.team,o.position,o.last_name] });
                    
                    // Resolve the promise to return the data
                    resolve(players);
                } else {
                    console.log("WARN: getPlayers() was empty");
                    resolve([]);
                }
            })
            .catch(function (error) {
                console.log("ERR: Problem fetching players:", error);
                reject(error);
            });
        }
    );
};

// Get the content for a player which may be cached in the players array.
// TODO: If the ID doesn't match one we have cached, do we try fetching from the server? Feels like that should happen on the caller's side so they can update the state.
export function getPlayer(id, players) {
    // Look through the list of players passed in, (would typically be from the state)
    if (players) {
        for (var i = 0; i < players.length; ++i) {
            if (id == players[i].id) {
                return players[i];
            }
        }
    }
    console.log("ERR: Player not found:", id);
    //return this.DEFAULT_PLAYER;
    return null;
};

export function addPlayer(player, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function(resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: {'x-access-token': token}
                });
                
                if (player.id == DEFAULT_PLAYER_ID) {
                    // This is a POST
                    axiosInstance.post('/api/v1/players', player)
                    .then(function (response) {
                        console.log(response);
                        player.id = response.data.id;
                        resolve(player);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log("ERR: addPlayer(): " + error.message);
                        reject(error.message);
                    });
                } else {
                    // This is a PUT
                    axiosInstance.put(`/api/v1/players/${player.id}`, player)
                    .then(function (response) {
                        console.log(response);
                        resolve(player);
                    })
                    .catch(function (error) {
                        // TODO: Show error message on UI
                        console.log("ERR: addPlayer(): " + error.message);
                        reject(error.message);
                    });
                }
            } catch(e) {
                // try failed
                console.log("ERR: addPlayer() failed:", e.message);
                reject(e.message);
            }
        }        
    );  
};

// Delete content from our DB with the specified ID.
// Returns the ID of the item deleted, or an error message.
export function removePlayer(playerId, token) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            try {
                const axiosInstance = Axios.create({
                    headers: { 'x-access-token': token }
                });

                axiosInstance.delete(`/api/v1/players/${playerId}`)
                .then(function (response) {
                    // Object was deleted
                    console.log(response);
                    resolve(response.data.id);
                })
                .catch(function (error) {
                    // Some issue trying to delete the object
                    console.log("ERR: removePlayer(): " + error.message);
                    reject(error.message);
                });

            } catch (e) {
                // try failed
                console.log("ERR: removePlayer() failed:", e.message);
                reject(e.message);
            }
        }
    );
};
