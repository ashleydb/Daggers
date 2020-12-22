var $ = require('jquery');
var Axios = require('axios');

// TODO: Minor. Should this be part of TableAPI and should that be a class?
export const DEFAULT_TABLE = {
  "leagueCaption": "English National League",
  "standing": [
    //   {
    //   "_links": {
    //     "team": {
    //       "href": "http://api.football-data.org/v1/teams/1114"
    //     }
    //   },
    //   "position": 4,
    //   "teamName": "Dagenham &amp; Redbridge",
    //   "crestURI": "",
    //   "playedGames": 46,
    //   "points": 84,
    //   "goals": 79,
    //   "goalsAgainst": 53,
    //   "goalDifference": 26,
    //   "wins": 26,
    //   "draws": 6,
    //   "losses": 14,
    //   "home": {
    //     "goals": 37,
    //     "goalsAgainst": 28,
    //     "wins": 12,
    //     "draws": 5,
    //     "losses": 6
    //   },
    //   "away": {
    //     "goals": 42,
    //     "goalsAgainst": 25,
    //     "wins": 14,
    //     "draws": 1,
    //     "losses": 8
    //   }
    // }
  ]
};

// TODO: Doesn't store the data within the API at all, just returns whatever we download to the caller. Should manage state?
export function getTable() {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            // Call our server to fetch some news
            Axios.get('/api/v1/table')
            .then(function (response) {
                var table = response.data;

                if (table) {
                    // Cool, we got content. Resolve the promise to return the data
                    resolve(table);
                } else {
                    console.log("WARN: getTable() was empty");
                    resolve(null);
                }
            })
            .catch(function (error) {
                console.log("ERR: Problem fetching table:", error);
                reject(error);
            });
        }
    );
};
